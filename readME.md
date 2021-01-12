
# Setup Project

The project forms the backend for our web application.

Install npm packages 
- `docker-compose run backend npm install`
- `docker-compose run frontend npm install`

Start containers
- `docker-compose up` / `docker-compose up -d`

Sync database schema
- `docker-compose exec backend npm run typeorm schema:sync`

(Optional) Add Fixtures
- `docker-compose exec backend npm run fixtures`

Start Tests
- `docker-compose exec backend npm run test`
- `cd .\packages\cypress\`
- `npx cypress open`

## Motivation
The backend is used for data processing between the frontend and the database.

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
 - All Tracking: localhost:4000/api/tracking
 - Single Tracking: localhost:4000/api/tracking/:TrackingID

**POST**
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
The backend can be tested with the command 
`docker-compose exec backend npm run test`
