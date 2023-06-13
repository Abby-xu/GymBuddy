# import fastAPI from fastapi package
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# import dependencies
from .database import db
from .models.user import UserSchema

# import router
from .routers.reservation import router as ReservationRouter
from .routers.equipment import router as EquipmentRouter
from .routers.user import router as UserRouter
from .routers.reservation import router as ReservationRouter
from .routers.monitor import router as monitorRouter
from .routers.issue import router as IssueRouter

# creating an app instance
app = FastAPI()

# including router
app.include_router(ReservationRouter, tags=[
                   "Reservation"], prefix="/reservation")
app.include_router(EquipmentRouter, tags=["Equipment"], prefix="/equipment")
app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(ReservationRouter, tags=["Reservation"], prefix="/reservation")
app.include_router(monitorRouter, tags=["Monitor"], prefix="/monitor")
app.include_router(IssueRouter, tags=["Issue"], prefix="/issue")

# Configure CORS middleware
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://gymbuddy.one",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# home page


# @app.get("/")
# async def home():
#     return {"message": "Awesome Leads Manager"}

# test for get equipment page


# @app.get("/equipment")
# async def list_equipments():
#     # loop through the database to obtain the equipment
#     return {"message": "equipments"}

# test for get reservations page
@app.get("/reservations")
async def list_reservations():
    # loop through the database to obtain the equipment
    return {"message": "reservations"}

# test for the admin


@app.get("/admin")
async def list_admins():
    # loop through the database to obtain the equipment
    return {"message": "admin page"}


@app.get("/data")
async def get_data():
    data = [
        {"id": 1, "name": "Item 1"},
        {"id": 2, "name": "Item 2"},
        {"id": 3, "name": "Item 3"}
    ]
    return data
