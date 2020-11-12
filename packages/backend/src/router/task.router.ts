import { Router } from 'express';
import { 
    getTask,
    getTasks,
    createTask,
    deleteTask,
    patchTask 
} from '../controller/task.controller';


export const taskRouter = Router({ mergeParams: true });


    //alle transaktionen anzeigen
    taskRouter.get('/', getTasks);
  
    //transaktion anlegen
    taskRouter.post('/', createTask);
  
    //bestimmte transaktion über id anzeigen
    taskRouter.get('/:taskId', getTask);
      
    //transaktionen löschen
    taskRouter.delete('/:taskId', deleteTask);
  
    //transaktion updaten
    taskRouter.patch('/:taskId', patchTask);
  
  