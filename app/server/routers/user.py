import datetime
from bson.objectid import ObjectId
from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from ..database import db
from ..models.user import (
    ErrorResponseModel,
    ResponseModel,
    UserSchema,
    UpdateUserModel,
)
from ..models.reservation import (
    ErrorResponseModel,
    ResponseModel,
    ReservationSchema,
)

user_collection = db.users
reservation_collection = db.reservations
router = APIRouter()

########## helper functions ##########
# Retrieve all users present in the database
async def retrieve_users():
    users = []
    for user in user_collection.find():
        users.append(UserSchema(**user))
    return users

# Add a new user into to the database
async def add_user(user_data: dict) -> dict:
    user = await retrieve_user(user_data["username"])
    if user:
        return
    user = user_collection.insert_one(user_data)
    new_user = await retrieve_user(user_data["username"])
    return new_user

# Retrieve a user with a matching username
async def retrieve_user(username: str) -> dict:
    user = user_collection.find_one({"username": username})
    if user:
        return UserSchema(**user)

# Retrieve reservations by username   
async def get_my_reservation(username):
    curr_date = datetime.date.today()
    # curr_time = datetime.datetime.now().strftime("%H:%M")
    before_30_minutes = datetime.datetime.now() - datetime.timedelta(minutes=30)
    # Format the time as HH:MM
    curr_time = before_30_minutes.strftime("%H:%M")

    res = []
    reservations = reservation_collection.find({"username": username})
    for reservation in reservations:
        r_date = reservation['res_date']
        r_start = reservation['start_time']
        m1, d1, y1 = [int(x) for x in r_date.split('/')]
        res_date = datetime.date(y1, m1, d1)
        if res_date > curr_date:
            res.append(ReservationSchema(**reservation))
        if res_date == curr_date:
            curr_time.split(':')
            if int(curr_time.split(':')[0]) < int(r_start.split(":")[0]) or (int(curr_time.split(':')[0]) == int(r_start.split(":")[0]) and int(curr_time.split(':')[1]) < int(r_start.split(":")[1])) :
                res.append(ReservationSchema(**reservation))
    return res    

# Update a user with a matching username
async def update_user(username: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    user = await retrieve_user(username)    
    if user:
        updated_user = user_collection.update_one(
            {"username": username}, {"$set": data}
        )
        if updated_user:
            return True
        return False

# Delete a user from the database
async def delete_user(username: str):
    user = await retrieve_user(username)
    if user:
        user_collection.delete_one({"username": username})
        return True

########## define routers ##########
# create
@router.post("/", response_description="User data added into the database")
async def add_user_data(user: UserSchema = Body(...)):
    # user = jsonable_encoder(user)
    user = {k: v for k, v in user.dict().items() if v is not None}
    new_user = await add_user(user)
    if new_user:
        return ResponseModel(new_user, "User added successfully.")
    return ErrorResponseModel("An error occurred.", 404, "User exists.")

# read users
@router.get("/", response_description="Users retrieved")
async def get_users():
    users = await retrieve_users()
    if users:
        return ResponseModel(users, "Users data retrieved successfully")
    return ResponseModel(users, "Empty list returned")

# read user by username
@router.get("/{username}", response_description="User data retrieved")
async def get_user_data(username):
    user = await retrieve_user(username)
    if user:
        return ResponseModel(user, "User data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "User doesn't exist.")

# read reservations by username
@router.get("/{username}/reservations", response_description="Reservation data retrieved")
async def get_reservation_data(username):
    reservation = await get_my_reservation(username)
    if reservation:
        return ResponseModel(reservation, "Reservation data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Reservation doesn't exist.")

# update user data
@router.put("/{username}")
async def update_user_data(username: str, req: UpdateUserModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_user = await update_user(username, req)
    if updated_user:
        return ResponseModel(
            "User with username: {} name update is successful".format(username),
            "User name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the user data.",
    )

# delete user
@router.delete("/{username}", response_description="User data deleted from the database")
async def delete_user_data(username: str):
    deleted_user = await delete_user(username)
    if deleted_user:
        return ResponseModel(
            "User with username: {} removed".format(username), "User deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "User with username {0} doesn't exist".format(username)
    )