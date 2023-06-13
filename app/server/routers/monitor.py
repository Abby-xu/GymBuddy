from fastapi import APIRouter, Body
import socket
import re
from fastapi.responses import JSONResponse

 # configure this for the device 
IP_ADDR = '10.229.194.188'
PORT = 12345
router = APIRouter()

def validate_ip_address(ip_address):
    # regular expression pattern for an IP address
    pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
    if re.match(pattern, ip_address):
        return True
    else:
        return False

def validate_port_number(port_number):
    # regular expression pattern for a port number
    pattern = r'^\d{1,5}$'
    if re.match(pattern, port_number):
        return True
    else:
        return False

@router.get("/getCurrentCapacity", response_description="Return num of people in the section")
async def getCurrentCapacity():
    print(IP_ADDR, PORT)
    message = "Request detection..."
    # with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    #     s.connect((IP_ADDR, PORT))
    #     s.sendall(message.encode())
    #     response = s.recv(1024)
    # return {"response": response.decode()}
    return {"response": message}

@router.get("/setMonitor/{ip_addr}/{port}", response_description="Monitor Setting")
async def setMonitor(ip_addr, port):
    global IP_ADDR
    global PORT
    if validate_ip_address(ip_addr) and validate_port_number(port):
        IP_ADDR = ip_addr
        PORT = port
        response = "Successfully change"
        return {"response": response}
    else:
        response = "Error"
        return {"response": response}
