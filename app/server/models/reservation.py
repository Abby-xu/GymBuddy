from typing import Optional
from pydantic import BaseModel, Field

class ReservationSchema(BaseModel):
    res_id: str = Field(...)
    equip_id: str = Field(...)
    equip_name: str = Field(...)
    username: str = Field(...)
    res_date: str = Field(...)
    start_time: str = Field(...)
    end_time: str = Field(...)

    class Config:
        schema_extra = {
            "reservation example": {
                "res_id": "3jxl42",
                "equip_id": "001",
                "equip_name": "Indoor Cycle",
                "username": "sportywu",
                "res_date": "03/21/2023",
                "start_time": "17:30",
                "end_time": "19:30",
            }
        }

class InsertReservationModel(BaseModel):
    res_id: str = Field(...)
    equip_name: str = Field(...)
    username: str = Field(...)
    res_date: str = Field(...)
    start_time: str = Field(...)
    end_time: str = Field(...)

    class Config:
        schema_extra = {
            "reservation example": {
                "res_id": "3jxl42",
                "equip_name": "Indoor Cycle",
                "username": "sportywu",
                "res_date": "03/21/2023",
                "start_time": "17:30",
                "end_time": "19:30",
            }
        }

class UpdateReservationModel(BaseModel):
    res_id: str = Field(...)
    equip_id: str = Field(...)
    equip_name: str = Field(...)
    username: str = Field(...)
    res_date: str = Field(...)
    start_time: str = Field(...)
    end_time: str = Field(...)

    class Config:
        schema_extra = {
            "reservation example": {
                "res_id": "3jxl42",
                "equip_id": "001",
                "equip_name": "Indoor Cycle",
                "username": "sportywu",
                "res_date": "03/21/2023",
                "start_time": "17:30",
                "end_time": "19:30",
            }
        }

def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}