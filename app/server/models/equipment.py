from typing import Optional
from pydantic import BaseModel, Field

class EquipSchema(BaseModel):
    equip_id: str = Field(...)
    equip_name: str = Field(...)
    status: str = Field(...)
    location: str = Field(...)
    category: str = Field(...)

    class Config:
        schema_extra = {
            "equipment example": {
                "equip_id": "158",
                "equip_name": "runner", 
                "status": "fixing",
                "location": "A5",
                "category": "gym",
            }
        }

class UpdateEquipModel(BaseModel):
    equip_id: str = Field(...)
    equip_name: str = Field(...)
    status: str = Field(...)
    location: str = Field(...)
    category: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "equip_id": "158",
                "equip_name": "runner", 
                "status": "fixing",
                "location": "A5",
                "category": "gym",
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