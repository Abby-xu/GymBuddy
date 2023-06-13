from fastapi.testclient import TestClient

from ..server.app import app
import requests
client = TestClient(app)

def test_get_equipment():
    response = client.get("/equipment")
    assert response.status_code == 200
    assert response.json()['data'][0][0] >= 0

def test_post_equipment():
    data = {
        "equip_id": "string",
        "equip_name": "string",
        "status": "string",
        "location": "string",
        "category": "string"
    }
    url = "http://localhost:8000/equipment"
    response = requests.post(url, json=data)

    assert response.status_code == 200
    assert response.json()['code'] == 200
    equip_id = "string"
    response = client.delete(f"/equipment/{equip_id}")
    assert response.status_code == 200

def test_get_equipment_status():
    response = client.get('/equipment/status')
    assert response.status_code == 200
    assert response.json()['message'] == "Equipment status retrieved successfully"

def test_get_equipment_category():
    response = client.get('/equipment/category')
    assert response.status_code == 200
    assert response.json()['message'] == "Equipment category retrieved successfully"

def test_get_equipments_id():
    equip_id = "001"
    response = client.get(f"/equipment/{equip_id}")
    assert response.status_code == 200
    assert response.json()['message'] == 'Equipment info retrieved successfully'

def test_update_equipment_id():
    data = {
        "equip_id": "string",
        "equip_name": "string",
        "status": "string",
        "location": "string",
        "category": "string"
    }
    # response = client.post("/equipment", json=data)
    url = "http://localhost:8000/equipment"
    response = requests.post(url, json=data)
    assert response.status_code == 200
    
    updated_data = {
        "equip_id": "string",
        "equip_name": "string",
        "status": "available",
        "location": "string",
        "category": "string"
    }
    equip_id = "string"
    response = client.put(f"/equipment/{equip_id}", json=updated_data)
    assert response.status_code == 200
    
    response = client.get(f"/equipment/{equip_id}")
    assert response.status_code == 200
    assert response.json()['data'][0]["status"] == "available"
    
    response = client.delete(f"/equipment/{equip_id}")
    assert response.status_code == 200

def test_delete_equipments_id_nonexist():
    equip_id = "sdfsfsd"
    response = client.delete(f"/equipment/{equip_id}")
    assert response.status_code == 200
    assert response.json()['error'] == "An error occurred"
    assert response.json()['code'] == 404

def test_equipment_setMonitor():
    ip_addr = '192.168.0.1'
    port = '12345'
    response = client.get(f"/equipment/setMonitor/{ip_addr}/{port}")
    assert response.status_code == 200
    assert response.json()['response'] == "Successfully change"

def test_equipment_available():
    date = "04172023"
    equip_name = "Indoor Cycle"
    start_time = "12"
    response = client.get(f"/equipment/available_equip/{date}/{equip_name}/{start_time}")
    assert response.status_code == 200
    assert response.json()['code'] == 200