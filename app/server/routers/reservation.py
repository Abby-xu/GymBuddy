from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
import datetime
import pytz

from ..database import db

from ..models.reservation import (
    ErrorResponseModel,
    ResponseModel,
    ReservationSchema,
    InsertReservationModel,
    UpdateReservationModel,
)

router = APIRouter()
reservation_collection = db.reservations

# ---- Helper Functions ----


async def retrieve_reservations():
    reservations = []
    for reservation in reservation_collection.find():
        reservations.append(ReservationSchema(**reservation))
    return reservations


async def retrieve_reservation(reservation_id):
    reservation = reservation_collection.find_one({"res_id": reservation_id})
    if reservation:
        return ReservationSchema(**reservation)


async def get_reservation_date(curr_date):
    # remove this line later on
    # curr_date = "03/22/2023"

    pipeline = [
        {"$match": {"res_date": curr_date}},
        {"$sort": {"start_time": 1}}
    ]
    hourly_reservations = {hour: 0 for hour in range(6, 19)}
    reservations = reservation_collection.aggregate(pipeline)
    for res in reservations:
        hour = int(res['start_time'].split(":")[0])
        hourly_reservations[hour] += 1
    hourly_list = list(hourly_reservations.items())
    return hourly_list


async def get_blocktime(equipment, date, user):

    search_date = date[5:7] +'/' + date[8:] + '/'+ date[:4]

    reservations = [reservation for reservation in reservation_collection.find(
        {"equip_name": equipment, "res_date": search_date})]

    reservations.sort(key=lambda x: x['start_time'])
    num_equip = len(
        [equip for equip in db.equipments.find({"equip_name": equipment})])

    block = set()
    # check all the res user has made
    userTotalRes = [userRes for userRes in
                    reservation_collection.find({
                        'equip_name': equipment,
                        'username': user,
                        'res_date': search_date,
                    })]

    # block the time period user has made
    for userRes in userTotalRes:
        block.add("-".join([userRes['start_time'], userRes['end_time']]))

    # block based on if others has already chosen workout at this time period
    # handle edge case when num_equip is 1
    if len(reservations) == num_equip:
        block.add(
            "-".join([reservations[0]['start_time'], reservations[0]['end_time']]))
    else:
        count = 1
        for i in range(1, len(reservations)):
            count = count + \
                1 if reservations[i]['start_time'] == reservations[i -
                                                                   1]['start_time'] else 0
            if count == num_equip:
                block.add(
                    "-".join([reservations[i]['start_time'], reservations[i]['end_time']]))
                count = 1

    # block the before timeline
    texas_tz = pytz.timezone('US/Central')
    texas_now = datetime.datetime.now(texas_tz)
    date_obj = datetime.datetime.strptime(date, "%Y-%m-%d")

    formatted_date = date_obj.date().isoformat()
    start_time = texas_now.replace(year=date_obj.year, month=date_obj.month, day=date_obj.day, hour=6, minute=0, second=0, microsecond=0)
    end_time = texas_now.replace(year=date_obj.year, month=date_obj.month, day=date_obj.day, hour=18, minute=0, second=0, microsecond=0)

    # Loop through the time slots from the start time to the end time in half-hour increments
    while start_time < end_time and start_time <= texas_now:
        time_slot = start_time.strftime('%H:%M') + '-' + (start_time + datetime.timedelta(minutes=30)).strftime('%H:%M')
        left_time, right_time = time_slot.split("-")
        if left_time.startswith("0"):
            left_time = left_time[1:]
        if right_time.startswith("0"):
            right_time = right_time[1:]
        updated_time_str = f"{left_time}-{right_time}"
        block.add(updated_time_str)
        start_time += datetime.timedelta(minutes=30)

    reservation_time = [f"{reservation['start_time']}-{reservation['end_time']}" for reservation in reservation_collection.find(
    {"username": user, "res_date": search_date})]
    for res_time in reservation_time:
        block.add(res_time)
    return block

async def get_reservation_rest(date, user):
    search_date = date[:2]+'/'+date[2:4]+'/'+date[4:]
    limitation = 5 # number of reservation per day
    user_total_res = len([res for res in
                    reservation_collection.find({
                        'username': user,
                        'res_date': search_date,
                    })])
    return limitation - user_total_res

async def add_reservation(reservation_data):
    reservation = reservation_collection.insert_one(reservation_data)
    new_reservation = await retrieve_reservation(reservation_data["res_id"])
    return new_reservation


async def update_reservation(reservation_id, data):
    if len(data) < 1:
        return False
    reservation = await retrieve_reservation(reservation_id)
    if reservation:
        updated_reservation = reservation_collection.update_one(
            {"res_id": reservation_id}, {"$set": data}
        )
        if updated_reservation:
            return True
        return False


async def get_equip_id(reservation):
    all_equipments = [equip['equip_id'] for equip in db.equipments.find(
        {"equip_name": reservation["equip_name"]})]
    equip_not_available = [reservation['equip_id'] for reservation in reservation_collection.find(
        {"equip_name": reservation["equip_name"], "res_date": reservation["res_date"], "start_time": reservation["start_time"]})]
    for equip_id in all_equipments:
        if equip_id not in equip_not_available:
            return equip_id


async def delete_reservation(reservation_id: str):
    user = await retrieve_reservation(reservation_id)
    if user:
        reservation_collection.delete_one({"res_id": reservation_id})
        return True

# ---- Routing ----


@router.post("/", response_description="Reservation data added into the database")
async def add_reservation_data(reservation: ReservationSchema = Body(...)):
    reservation = jsonable_encoder(reservation)
    # equipID = await get_equip_id(reservation)
    # reservation['equip_id'] = equipID
    new_reservation = await add_reservation(reservation)
    return ResponseModel(new_reservation, "Reservation added successfully.")


@router.get("/", response_description="Reservations retrieved")
async def get_reservations():
    reservations = await retrieve_reservations()
    if reservations:
        return ResponseModel(reservations, "Reservations data retrieved successfully")
    return ResponseModel(reservations, "Empty list returned")


@router.get("/today_reservation", response_description="Reservations retrieved")
async def get_today_reservation():
    today_date = datetime.datetime.now().strftime('%m/%d/%Y')
    hourly_count = await get_reservation_date(today_date)
    if hourly_count:
        return ResponseModel(hourly_count, "Reservations data retrieved successfully")
    return ResponseModel(hourly_count, "Empty list returned")


@router.get("/block/{equip_name}/{date}/{user}", response_description="Blocked time retrieved")
async def get_blocked_time(equip_name, date, user):
    blocked_time = await get_blocktime(equip_name, date, user)
    if blocked_time:
        return ResponseModel(blocked_time, "Blocked time retrieved successfully")
    return ResponseModel(blocked_time, "All equipment are avaliable")


@router.get("/limit/{date}/{user}", response_description="# of reservation left retrieved")
async def get_res_rest(date, user):
    rest_res = await get_reservation_rest(date, user)
    if rest_res:
        return ResponseModel(rest_res, "# of reservation left retrieved successfully")
    return ResponseModel(rest_res, "User reached the reservation limit")

@router.get("/{reservation_id}", response_description="Reservation data retrieved")
async def get_reservation_data(reservation_id):
    reservation = await retrieve_reservation(reservation_id)
    if reservation:
        return ResponseModel(reservation, "Reservation data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Reservation doesn't exist.")


@router.put("/{reservation_id}")
async def update_reservation_data(reservation_id: str, req: UpdateReservationModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_reservation = await update_reservation(reservation_id, req)
    if updated_reservation:
        return ResponseModel(
            "Reservation with ID: {} name update is successful".format(
                reservation_id),
            "Reservation updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the reservation data.",
    )


@router.delete("/{reservation_id}", response_description="Reservation data deleted from the database")
async def delete_reservation_data(reservation_id: str):
    deleted_reservation = await delete_reservation(reservation_id)
    if deleted_reservation:
        return ResponseModel(
            "Reservation with ID: {} removed".format(
                reservation_id), "Reservation deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "Reservation with ID {0} doesn't exist".format(
            reservation_id)
    )
