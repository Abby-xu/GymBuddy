from fastapi.testclient import TestClient

from ..server.app import app
import requests
client = TestClient(app)

def test_get_issues():
    response = client.get("/issue")
    assert response.status_code == 200
    assert len(response.json()['data'][0]) >= 4

def test_post_issues():
    # Set up the test data
    data = {
        "username": "leo123",
        "subject": "Lifting Issue",
        "message": "A test message for reporting an issue"
    }
    # Make the POST request
    # response = client.post("/issue", json=data)
    url = "http://localhost:8000/issue"
    response = requests.post(url, json=data)
    # Check that the response has a 200 status code
    assert response.status_code == 200
    assert response.json()['message'] == "Issue added successfully."
    assert response.json()['code'] == 200

    response = client.delete("/issue/leo123")
    assert response.status_code == 200

def test_get_issues_id():
    response = client.get("/issue/HTT7EheW")
    assert response.status_code == 200
    # assert response.json()['message'] == 'Issue data retrieved successfully'
    # assert len(response.json()['data']) == 1

def test_delete_issues_id_fail():
    response = client.delete("/issue/sdfsfsd")
    assert response.status_code == 200
    assert response.json()['error'] == "An error occurred"
    assert response.json()['code'] == 404
    assert response.json()['message'] == "Issue with issue_id sdfsfsd doesn't exist"