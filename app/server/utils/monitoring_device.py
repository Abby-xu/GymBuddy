import cv2
import time
import imutils
import numpy as np
import argparse
import threading
import socket
HOST = '10.2.124.252'
PORT = 12345
mylock = threading.Lock()
shared_var = 0
from urllib import parse
from pymongo import MongoClient

def detectWeight(frame):
    HOGCV = cv2.HOGDescriptor()
    HOGCV.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())
    bounding_box_cordinates, weights =  HOGCV.detectMultiScale(frame, winStride = (4, 4), padding = (8,8), scale = 1.1)
    num_person = 0
    print(weights)
    for i, (x,y,w,h) in enumerate(bounding_box_cordinates):
        if weights[i] < 0.75:
            continue
        num_person += 1
    '''
    (indent) cv2.rectangle(frame, (x,y), (x+w,y+h), (0,255,0), 1)
    (indent) cv2.putText(frame, f'person {num_person}', (x,y), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0,0,255), 1)
    cv2.putText(frame, 'Status : Detecting ', (40,40), cv2.FONT_HERSHEY_DUPLEX, 0.5, (255,0,0), 1)
    cv2.putText(frame, f'Total Persons : {num_person}', (40,70), cv2.FONT_HERSHEY_DUPLEX, 0.5, (255,0,0), 1)
    cv2.imshow('output', frame)
    '''
    return num_person

def detectByPathRealTime(collection, result_id):
    query = {"_id": result_id}
    # create a VideoCapture object to capture video from the default camera
    cap = cv2.VideoCapture(0)

    # check if the camera was opened successfully
    if not cap.isOpened():
        print("Error opening camera")
        exit()

    # set the timer interval (in seconds)
    timer_interval = 5

    # loop through the video frames
    start_time = time.time()
    while True:
        time.sleep(timer_interval)

        ret, frame = cap.read()

        if not ret:
            print("Error reading frame")
            break

        # check if it's time to capture a picture
        current_time = time.time()

        if current_time - start_time >= timer_interval:
            print('write frame')
            cv2.imwrite('./screenshot2.jpg', frame)
            start_time = current_time

        # display the frame in a window
        cv2.imshow('Camera', frame)

        result = collection.find_one(query)
        print('Person in database', result['num_people'])

        # run the capture by image function
        num_person = detectByPathImage('./screenshot2.jpg')
        print("Person: ", num_person, "\n\n")

        update_data = {"$set": {"num_people": num_person}}
        collection.update_one(query, update_data)

        # wait for a key event to exit
        if cv2.waitKey(1) == ord('q'):
            result = collection.delete_one(query)
            print("Deleted documents:", result.deleted_count)
            break

    # release the VideoCapture object and close the window
    cap.release()
    cv2.destroyAllWindows()

def detectByPathVideo(path):
    # create VideoCapture object to open the video file
    cap = cv2.VideoCapture(path)

    # calculate frame rate of the video
    fps = cap.get(cv2.CAP_PROP_FPS)

    # calculate frame number for the middle of the video
    duration = cap.get(cv2.CAP_PROP_FRAME_COUNT) / fps
    middle_frame = int(fps * duration / 2)

    # set current frame of the video to the middle frame
    cap.set(cv2.CAP_PROP_POS_FRAMES, middle_frame)

    ret, frame = cap.read()
    cv2.imwrite('./screenshot.png', frame)
    cap.release()

    return detectByPathImage('./screenshot.png')

def detectByPathImage(path):
    image = cv2.imread(path)
    image = imutils.resize(image, width=800, height=400)
    return detectWeight(image)

def server_connections():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen()
        print(f'Server is listening on {PORT}')
        while True: # loop to wait for new connections
            conn, addr = s.accept()
            with conn:
                print(f'Connected by {addr}')
                while True: # loop to handle requests from connected client
                    data = conn.recv(1024)
                    if not data:
                        break
                    mylock.acquire() # acquire the lock to access the shared variable
                    conn.sendall(str(shared_var).encode())
                    mylock.release()

if __name__ == "__main__":

    client = MongoClient("mongodb+srv://{account}:{password}@cluster.68iqcvb.mongodb.net/{authenticationDatabase}".format(
        account=parse.quote_plus("admin"),
        password=parse.quote_plus("CSCE482"),
        authenticationDatabase=parse.quote_plus("?retryWrites=true&w=majority")
    ))
    db = client.test
    print("successfully connected to the database")
    # Access
    collection = db["monitor"]

    document = {"IP": HOST, "PORT": PORT, "num_people": 0}
    result = collection.insert_one(document)
    detectByPathRealTime(collection, result.inserted_id)