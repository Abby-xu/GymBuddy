from typing import Optional
from pydantic import BaseModel, Field

class IssueSchema(BaseModel):
    issue_id: str = Field(...)
    username: str = Field(...)
    subject: str = Field(...)
    message: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "issue_id": "vsf83mf9",
                "username": "john123",
                "subject": "Report An Issue",
                "message": "This is a message for reporting an issue"
            }
        }

class InsertIssueSchema(BaseModel):
    username: str = Field(...)
    subject: str = Field(...)
    message: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "username": "john123",
                "subject": "Report An Issue",
                "message": "This is a message for reporting an issue"
            }
        }

# class UpdateIssueModel(BaseModel):
#     issue_id: Optional[str]
#     username: Optional[str]
#     subject: Optional[str]
#     message: Optional[str]

#     class Config:
#         schema_extra = {
#             "example": {
#                 "issue_id": "vsf83mf9",
#                 "username": "john123",
#                 "subject": "Report An Issue",
#                 "message": "This is a message for reporting an issue"
#             }
#         }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
