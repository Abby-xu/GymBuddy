# README

## Introduction

This capstone project is sponsored by Dr.Thomas, the instructor leading CSCE482 capstone course. 
The purpose of this project is to implement a gym equipment management system for users to track, update, and reserve the use of equipment, which could prevent users from waiting for others and benefit them to use the equipment in a more efficient way.

### Authors

- Rong Xu, Computer Science, Class of 2023
- Linjian Yang, Computer Science, Class of 2023
- Jiayu Wu, Computer Science, Class of 2023 
- Priyanka Rao, Computer Science, Class of 2023 


## Requirements

This project is based on following tech stacks:

- Frontend: React
- Backend: FastAPI, OpenCV
- Databse: MongoDB

## External Deps

- Git - Download latest version at https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- GitHub Desktop (Not needed, but HELPFUL) at https://desktop.github.com/

## Installation

Download this code repository by using git:

`git clone https://github.com/CSCE-482-Thomas-2023Spring/GymBuddy.git`

 or 

`git clone https://github.com/CSCE-482-Thomas-2023Spring/GymBuddy.git`

on code IDE, set up the environment by following code:
```shell
source venv/bin/activate
pip install -r requirements.txt
cd gym-buddy
npm install
```

## Tests

We will put something here later...

## File Structure

- `app`: backend folder
  - `server`
  - `__init__.py`
  - `main.py`
- `gym-buddy`: frontend folder
  - will fill more info later...
- `venv`: folder that includes enviornmental setup files


## Execute Code

After pull the code by Git and set up the environment. Running the following codes in two seperate terminal sessions to start the backend and frontend:
`python app/main.py`
and
`cd gym-buddy && npm start`


## Deployment

For this code submission, we will only hold the main branch as the fully working system.

Note:
- `$ git checkout -b <branch>` will create and switch to the new branch
- `$ git checkout <branch>` will only switch to the branch
You don’t need to create a new branch in Github in advance, because $ git push origin <branch> will do it for you if Github doesn’t have a corresponding branch.

Since we only have one branch at this time, the deployment will simply run the following commands:
```shell
git remote add origin https://github.com/CSCE-482-Thomas-2023Spring/GymBuddy.git
git branch -M main
git push -u origin main
```

## Support

The support of this project will keep running until the end of this semester (Spring 2023). In order to fix any issue, please add your comments/questions in the "Issues" tab. One of our developers will follow the threads and solve your questions.

## Extra Helps

Please contact authors for help.
