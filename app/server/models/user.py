from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserSchema(BaseModel):
    username: str = Field(...)
    pwd: str = Field(...)
    identity: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "username": "john123",
                "pwd": "johnR123",
                "identity": "user"
            }
        }


class UpdateUserModel(BaseModel):
    username: Optional[str]
    pwd: Optional[str]
    identity: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "username": "john123",
                "pwd": "johnR123",
                "identity": "user"
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
