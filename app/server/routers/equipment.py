from .monitor import (IP_ADDR, PORT)

import socket
import datetime
import re
from bson.objectid import ObjectId
from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from ..database import db
from ..models.equipment import (
    EquipSchema,
    UpdateEquipModel,
    ResponseModel,
    ErrorResponseModel,
)

IP_ADDR = '10.229.194.188'
PORT = 12345

# create router
equipment_collection = db.equipments
reservation_collection = db.reservations
monitor_collection = db.monitor
router = APIRouter()

#### helper functions ####
# Retrieve equipment


async def retrieve_equipments():
    # reset in-use status
    for currE in equipment_collection.find({"status": 'in-use'}):
        currE['status'] = 'avaliable'
        equipment_collection.update_one(
            {"equip_id": currE['equip_id']}, {"$set": currE}
        )

    # sync monitoring data to change status for B20-23
    query = {"IP": IP_ADDR, "PORT": PORT}
    results = monitor_collection.find_one(query)
    cap = results["num_people"] if results else 0
    print('Num of People using the equipments:', cap)

    curr_pos = 20
    while cap > 0 and curr_pos <= 23:
        curr_e = equipment_collection.find_one(
            {"equip_name": 'Barbell Set', "location": 'B'+str(curr_pos)})
        curr_e['status'] = 'in-use'
        equipment_collection.update_one(
            {"equip_id": curr_e['equip_id']}, {"$set": curr_e})
        cap -= 1
        curr_pos += 1

    curr_date = datetime.date.today().strftime("%m/%d/%Y")
    curr_time = datetime.datetime.now().strftime("%H:%M")
    reservations = reservation_collection.find({"res_date": curr_date})

    # update equipment status by reservations
    for reservation in reservations:
        r_start = reservation['start_time']
        r_end = reservation['end_time']
        if int(curr_time.split(':')[0]) == int(r_start.split(":")[0]):
            if int(curr_time.split(':')[1]) > int(r_end.split(":")[1]):
                if int(curr_time.split(':')[0]) != int(r_end.split(":")[0]):
                    curr_equip = equipment_collection.find_one(
                        {"equip_id": reservation['equip_id']})
                    curr_equip['status'] = 'in-use'
                    equipment_collection.update_one(
                        {"equip_id": curr_equip['equip_id']}, {"$set": curr_equip})
                else:
                    continue
            if int(curr_time.split(':')[1]) > int(r_start.split(":")[1]):
                curr_equip = equipment_collection.find_one(
                    {"equip_id": reservation['equip_id']})
                curr_equip['status'] = 'in-use'
                equipment_collection.update_one(
                    {"equip_id": curr_equip['equip_id']}, {"$set": curr_equip})

    # # data for real-time map
    # data = []
    # for char in ("A B C D E F G H".split()):
    #     temp = []
    #     for num in range(1,37):
    #         temp.append(' ')
    #     data.append(temp)

    # get updated equipment
    equipments = []
    ava = 0
    for equipment in equipment_collection.find():
        if equipment['status'] == 'avaliable':
            ava += 1
    #         data[ord(equipment['location'][0])-65][int(equipment['location'][1:])-1] = '1' + equipment['equip_id'][1:]
    #     elif equipment['status'] == 'in-use':
    #         data[ord(equipment['location'][0])-65][int(equipment['location'][1:])-1] = '2' + equipment['equip_id'][1:]
    #     else:
    #         data[ord(equipment['location'][0])-65][int(equipment['location'][1:])-1] = '3' + equipment['equip_id'][1:]
        equipments.append(EquipSchema(**equipment))

    # for i in range(len(data)):
    #     for j in range(len(data[0])):
    #         if data[i][j] == ' ': data[i][j] = '000'

    return ava, equipments


async def summarize_equipment_category():
    pipeline = [
        {'$group': {'_id': '$category', 'count': {'$sum': 1}}}
    ]
    result = equipment_collection.aggregate(pipeline)
    list_category = []
    for doc in result:
        list_category.append((doc['_id'], doc['count']))
    return list_category


async def summarize_equipment_status():
    pipeline = [
        {'$group': {'_id': '$status', 'count': {'$sum': 1}}}
    ]
    result = equipment_collection.aggregate(pipeline)
    list_status = []
    for doc in result:
        list_status.append((doc['_id'], doc['count']))
    return list_status


async def get_available_equip(date, equip, start_time):
    search_date = date[:2]+'/'+date[2:4]+'/'+date[4:]
    start_time = start_time[:2]+':' + \
        start_time[2:] if start_time[0] != '0' else start_time[1] + \
        ':'+start_time[2:]
    reservations = [reservation for reservation in reservation_collection.find(
        {"equip_name": equip, "res_date": search_date, "start_time": start_time})]
    equipments = [equip for equip in db.equipments.find({"equip_name": equip})]

    for reservation in reservations:
        for equipment in equipments:
            if equipment['equip_id'] == reservation['equip_id']:
                equipments.remove(equipment)

    return [EquipSchema(**equip) for equip in equipments]


async def retrieve_equipment(equip_id: str) -> dict:
    equip = equipment_collection.find_one({"equip_id": equip_id})
    if equip:
        return EquipSchema(**equip)

# Gets the quantity of each category of equipment


async def retrieve_equipment_qty():
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}}
    ]
    result = equipment_collection.aggregate(pipeline)
    print(result)
    category_list = []
    for c in result:
        category_list.append((c['_id'], c['count']))
    return category_list


# Add the equipment to the inventory
async def add_equipment(equipment_data: dict):
    equipment = equipment_collection.insert_one(equipment_data)
    new_equipment = await retrieve_equipment(equipment_data["equip_id"])
    return new_equipment

# Update the availability for the equipment


async def update_equipment(equip_id: str, data: dict):
    if len(data) < 1:
        return False

    equipment = await retrieve_equipment(equip_id)
    if equipment:
        updated_equipment = equipment_collection.update_one(
            {"equip_id": equip_id}, {"$set": data}
        )
        return True if updated_equipment else False

# Delete an equipment from the inventory


async def delete_equipment(equip_id: str):
    equipment = await retrieve_equipment(equip_id)
    if equipment:
        equipment_collection.delete_one({"equip_id": equip_id})
        return True


def validate_ip_address(ip_address):
    # regular expression pattern for an IP address
    pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
    if re.match(pattern, ip_address):
        return True
    else:
        return False


def validate_port_number(port_number):
    # regular expression pattern for a port number
    pattern = r'^\d{1,5}$'
    if re.match(pattern, port_number):
        return True
    else:
        return False

###### Define the routers ######


@router.get("/setMonitor/{ip_addr}/{port}", response_description="Monitor Setting")
async def setMonitor(ip_addr, port):
    global IP_ADDR
    global PORT
    if validate_ip_address(ip_addr) and validate_port_number(port):
        IP_ADDR = str(ip_addr)
        PORT = int(port)
        response = "Successfully change"
        return {"response": response}
    else:
        response = "Error"
        return {"response": response}

@router.get("/getMonitor", response_description="Get Monitor Setting")
async def setMonitor():
    return {
        "current ip_addr": IP_ADDR,
        "current port" : PORT
    }

# create equipment
@router.post("/", response_description="Equipment info added into the database")
async def add_equipment_info(equipment: EquipSchema = Body(...)):
    equipment = {k: v for k, v in equipment.dict().items() if v is not None}
    new_equipment = await add_equipment(equipment)
    if new_equipment:
        return ResponseModel(new_equipment, "Equipment added successfully")
    return ErrorResponseModel("An error occurred.", 404, "Equipment already exists.")

# read equipment


@router.get("/", response_description="Equipment retrieved")
async def get_equipments():
    equipments = await retrieve_equipments()
    if equipments:
        return ResponseModel(equipments, "Equipment info retrieved sucessfully")
    return ResponseModel(equipments, "Empty list returned")

# read equipment by category


@router.get("/category", response_description="Equipment category retrieved")
async def get_equipment_category():
    equipment_category = await summarize_equipment_category()
    if equipment_category:
        return ResponseModel(equipment_category, "Equipment category retrieved successfully")
    return ResponseModel(equipment_category, "Empty list returned")

# read equipment by status


@router.get("/status", response_description="Equipment status retrieved")
async def get_equipment_status():
    equipment_status = await summarize_equipment_status()
    if equipment_status:
        return ResponseModel(equipment_status, "Equipment status retrieved successfully")
    return ResponseModel(equipment_status, "Empty list returned")

# read available equipment during a time period


@router.get("/available_equip/{date}/{equip}/{start_time}", response_description="Available equipment retrieved")
async def get_ava_equip(date, equip, start_time):
    equipment_status = await get_available_equip(date, equip, start_time)
    if equipment_status:
        return ResponseModel(equipment_status, "Equipment status retrieved successfully")
    return ResponseModel(equipment_status, "Empty list returned")

# read equipment by equip_id


@router.get("/{equip_id}", response_description="Equipment info retrieved")
async def get_equipment_info(equip_id):
    equipment = await retrieve_equipment(equip_id)
    if equipment:
        return ResponseModel(equipment, "Equipment info retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Equipment doesn't exist.")

# update equipment info


@router.put("/{equip_id}")
async def update_equipment_info(equip_id: str, req: UpdateEquipModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_equipment = await update_equipment(equip_id, req)
    if updated_equipment:
        return ResponseModel(
            "Equipment with equipment id: {} name update is successful".format(
                equip_id),
            "Equipment id updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the equipment info.",
    )

# delete equipment


@router.delete("/{equip_id}", response_description="Equipment info deleted from the database")
async def delete_equipment_info(equip_id: str):
    deleted_equipment = await delete_equipment(equip_id)
    if deleted_equipment:
        return ResponseModel(
            "Equipment with id: {} removed".format(
                equip_id), "Equipment deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "Equipment with equipment id {0} doesn't exist".format(
            equip_id)
    )
