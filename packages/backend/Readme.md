# FWE-WS20-21-749219-HA1

The project forms the backend for our web application.

## Motivation
The backend is used for data processing between the frontend and the database.

## Installation / Setup

 1. navigate to the main folder 
 `cd timetracker`
 
 2. create Enviroment file 
 `cp ./packages/backend/.env.example ./packages/backend/.env`
 
 3. install NPM packages 
 `docker-compose run backend npm install`
 
 4. start docker container 
 `docker-compose up -d`
 
 5. synchronize database schema 
 `docker-compose exec backend npm run typeorm schema:sync`
 
 6th (Optional) Fixtures loading 
 `docker-compose exec backend npm run fixtures`
 
 7. perform automated tests 
 `docker-compose exec backend npm run test`

## Properties
Trackings cannot exist without a task.
When a task is deleted, all associated trackings are also deleted.

If the project has been successfully installed, you can perform the following actions: <br /><br />
**Get**

 - All tasks: localhost:4000/api/task
 - Single Task: localhost:4000/api/task/:TaskID
 - All labels of a task: localhost:4000/api/task/labels/:TaskID
 - All trackings of a task: localhost:4000/api/task/trackings/:TaskID
 - All labels: localhost:4000/api/label
 - Single label: localhost:4000/api/label/:LabelID 
 - All tasks of a label: localhost:4000/api/label/tasks/:LabelID
 - All tasks of a label: localhost:4000/api/label/tasks/:LabelID
 - All Tracking: localhost:4000/api/tracking
 - Single Tracking: localhost:4000/api/tracking/:TrackingID

**mail**
*Specification of the data in the body of the request*

 - Create Task: localhost:4000/api/task
 - Create label: localhost:4000/api/label
 - Create Tracking: localhost:4000/api/tracking/:TaskID

**Patch**
*Specification of the data in the body of the request*

 - Update Task: localhost:4000/api/task/:TaskID
 - Update / delete labels of a task: localhost:4000/api/task/:taskID/labels
 - Update label: localhost:4000/api/label/:LabelID
 - Update Tracking: localhost:4000/api/tracking/:TrackingID

**Delete**

 - Delete task: localhost:4000/api/task/:TaskID
 - Delete label of a task: localhost:4000/api/task/labels/:TaskID
 - Delete label: localhost:4000/api/label/:LabelID
 - Delete Tracking: localhost:4000/api/tracking/:TrackingID
## Tests
The backend can be started with the command 
`docker-compose exec backend npm run test`
can be tested. <br /><br />
The following cases are covered: 
