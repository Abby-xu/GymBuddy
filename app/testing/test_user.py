from fastapi.testclient import TestClient

from ..server.app import app

client = TestClient(app)
import requests

def test_get_users():
    response = client.get("/user")
    assert response.status_code == 200
    assert len(response.json()['data'][0]) >= 0
    assert response.json()['message'] == "Users data retrieved successfully"

def test_post_users():
    data = {
        "username": "leoy123456",
        "pwd": "johnR123",
        "identity": "user"
    }
    # response = client.post("/user", json=data)
    url = "http://localhost:8000/user"
    response = requests.post(url, json=data)
    assert response.status_code == 200
    assert response.json()['message'] == "User added successfully."
    assert response.json()['code'] == 200

    response = client.delete(f"/user/leoy123456")
    assert response.status_code == 200

def test_update_user_id():
    new_user = {
        "username": "leoyyy123",
        "pwd": "johnR123",
        "identity": "user"
    }
    # response = client.post("/user", json=new_user)
    url = "http://localhost:8000/user"
    response = requests.post(url, json=new_user)
    assert response.status_code == 200
    
    updated_user = {
        "name": "leoyyy123",
        "pwd": "yang123",
        "identity": "user"
        
    }
    username = "leoyyy123"
    response = client.put(f"/user/{username}", json=updated_user)
    assert response.status_code == 200
    
    response = client.get(f"/user/leoyyy123")
    assert response.status_code == 200
    assert response.json()['data'][0]["pwd"] == "yang123"
    
    response = client.delete(f"/user/leoyyy123")
    assert response.status_code == 200

def test_get_user_id():
    response = client.get("/user/jam")
    assert response.status_code == 200
    assert response.json()['message'] == 'User data retrieved successfully'
    assert len(response.json()['data']) == 1

def test_delete_user_id_fail():
    response = client.delete("/user/sdfsfsd")
    assert response.status_code == 200
    assert response.json()['error'] == "An error occurred"
    assert response.json()['code'] == 404
    assert response.json()['message'] == "User with username sdfsfsd doesn't exist"

def test_user_reservation():
    data = {
        "res_id": "12345",
        "equip_id": "001",
        "equip_name": "Treadmill",
        "username": "jam",
        "res_date": "05/20/2023",
        "start_time": "08:00",
        "end_time": "09:00"
    }
    # insert

    # response = client.post("/reservation", json=data)
    url = "http://localhost:8000/reservation"
    response = requests.post(url, json=data)
    assert response.status_code == 200
    assert response.json()['code'] == 200
    # check reservation
    response = client.get("/user/jam/reservations")
    assert response.status_code == 200
    assert response.json()['code'] == 200
    assert len(response.json()['data']) >= 0
    # delete
    res_id = "string"
    response = client.delete(f"/reservation/{res_id}")
    assert response.status_code == 200