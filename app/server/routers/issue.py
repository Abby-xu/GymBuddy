import shortuuid
from bson.objectid import ObjectId
from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder


from ..database import db
from ..models.issue import (
    ErrorResponseModel,
    ResponseModel,
    IssueSchema,
    InsertIssueSchema
)

issue_collection = db.issues
router = APIRouter()

########## helper functions ##########
# Retrieve all issues present in the database
async def retrieve_issues():
    issues = []
    for issue in issue_collection.find():
        issues.append(IssueSchema(**issue))
    return issues

# Add a new issue into to the database
async def add_issue(issue_data: dict) -> dict:
    issue = await retrieve_issue(issue_data["issue_id"])
    if issue:
        return
    issue = issue_collection.insert_one(issue_data)
    new_issue = await retrieve_issue(issue_data["issue_id"])
    return new_issue

# Retrieve a issue with a matching issue_id
async def retrieve_issue(issue_id: str) -> dict:
    issue = issue_collection.find_one({"issue_id": issue_id})
    if issue:
        return IssueSchema(**issue)

# Delete a issue from the database
async def delete_issue(issue_id: str):
    issue = await retrieve_issue(issue_id)
    if issue:
        issue_collection.delete_one({"issue_id": issue_id})
        return True

########## define routers ##########
# create
@router.post("/", response_description="Issue data added into the database")
async def add_issue_data(issue: InsertIssueSchema = Body(...)):
    issue = jsonable_encoder(issue)
    issueID = shortuuid.ShortUUID().random(length=8)
    issue['issue_id'] = issueID
    new_issue = await add_issue(issue)
    if new_issue:
        return ResponseModel(new_issue, "Issue added successfully.")
    return ErrorResponseModel("An error occurred.", 404, "Issue exists.")

# read issues
@router.get("/", response_description="Issues retrieved")
async def get_issues():
    issues = await retrieve_issues()
    if issues:
        return ResponseModel(issues, "Issues data retrieved successfully")
    return ResponseModel(issues, "Empty list returned")

# read issue by issue_id
@router.get("/{issue_id}", response_description="Issue data retrieved")
async def get_issue_data(issue_id):
    issue = await retrieve_issue(issue_id)
    if issue:
        return ResponseModel(issue, "Issue data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Issue doesn't exist.")

# delete issue
@router.delete("/{issue_id}", response_description="Issue data deleted from the database")
async def delete_issue_data(issue_id: str):
    deleted_issue = await delete_issue(issue_id)
    if deleted_issue:
        return ResponseModel(
            "Issue with issue_id: {} removed".format(issue_id), "Issue deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "Issue with issue_id {0} doesn't exist".format(issue_id)
    )