import { Router } from 'express';
import { 
    getTask,
    getTasks,
    createTask,
    deleteTask,
    patchTask,
    deleteLabelOfTask,
    getLabelsOfTask,
    getTrackingsOfTask
} from '../controller/task.controller';


export const taskRouter = Router({ mergeParams: true });


    //alle transaktionen anzeigen
    taskRouter.get('/', getTasks);
  
    //transaktion anlegen
    taskRouter.post('/', createTask);
  
    //bestimmte transaktion über id anzeigen
    taskRouter.get('/:taskId', getTask);

    //labels eines Tasks zurückgeben
    taskRouter.get('/labels/:taskId', getLabelsOfTask);

     //trackings eines Tasks zurückgeben
     taskRouter.get('/trackings/:taskId', getTrackingsOfTask);
      
    //transaktionen löschen
    taskRouter.delete('/:taskId', deleteTask);
 
    //transaktionen löschen
    taskRouter.delete('/labels/:taskId', deleteLabelOfTask);

    //transaktion updaten
    taskRouter.patch('/:taskId', patchTask);
  
  