from fastapi.testclient import TestClient

from ..server.app import app
import requests
client = TestClient(app)

def test_get_reservation():
    response = client.get("/reservation")
    assert response.status_code == 200
    assert len(response.json()['data'][0]) >= 0

def test_post_reservation():
    data = {
        "res_id": "12345",
        "equip_id": "001",
        "equip_name": "Treadmill",
        "username": "jam",
        "res_date": "05/01/2023",
        "start_time": "08:00",
        "end_time": "09:00"
    }
    # response = client.post("/reservation", json=data)
    url = "http://localhost:8000/reservation"
    response = requests.post(url, json=data)
    assert response.status_code == 200
    assert response.json()['code'] == 200
    res_id = "string"
    response = client.delete(f"/reservation/{res_id}")
    assert response.status_code == 200

def test_get_reservation_id():
    res_id = 1232323
    response = client.get(f"/reservation/{res_id}")
    assert response.status_code == 200
    assert response.json()['message'] == 'Reservation data retrieved successfully'
    assert response.json()['code'] == 200
    assert len(response.json()['data']) == 1

def test_update_reservation_id():
    data = {
        "res_id": "string",
        "equip_id": "001",
        "equip_name": "string",
        "username": "string",
        "res_date": "string",
        "start_time": "string",
        "end_time": "string"
    }
    # response = client.post("/reservation", json=data)
    url = "http://localhost:8000/reservation"
    response = requests.post(url, json=data)
    assert response.status_code == 200
    
    updated_data = {
        "res_id": "string",
        "equip_id": "001",
        "equip_name": "string",
        "username": "string",
        "res_date": "4/1/2023",
        "start_time": "11",
        "end_time": "12"
    }
    res_id = "string"
    response = client.put(f"/reservation/{res_id}", json=updated_data)
    assert response.status_code == 200
    
    response = client.get(f"/reservation/{res_id}")
    assert response.status_code == 200
    assert response.json()['data'][0]["end_time"] == "12"
    
    response = client.delete(f"/reservation/{res_id}")
    assert response.status_code == 200

def test_delete_reservation_id_nonexist():
    response = client.delete("/reservation/asasas")
    assert response.status_code == 200
    assert response.json()['error'] == "An error occurred"
    assert response.json()['code'] == 404

def test_get_today_reservation():
    response = client.get("/reservation/today_reservation")
    assert response.status_code == 200
    assert response.json()['code'] == 200
    assert len(response.json()['data']) >= 0

def test_get_block_reservation():
    equip_name = 'Indoor Cycle'
    date = '2023-04-22'
    user = 'jam'
    response = client.get(f"/reservation/block/{equip_name}/{date}/{user}")
    assert response.status_code == 200
    assert response.json()['code'] == 200

def test_get_res_reservation():
    date = '04112023'
    username = 'jam'
    response = client.get(f"/reservation/limit/{date}/{username}")
    assert response.status_code == 200
    assert response.json()['code'] == 200