import { getRepository} from 'typeorm';
import { Task } from '../entity/task';
import { Request, Response } from 'express';
import { Label } from '../entity/label';


export const getTasks = async (_: Request, res: Response) => {
    const taskRepository = await getRepository(Task);
    const task = await taskRepository.find();
    res.send({
      data:task,
    });
  };

export const createTask = async (req: Request, res: Response) => {
    const {name, description, labelIds} = req.body;

    const task = new Task();
    task.name = name;
    task.description = description;
    task.labels = [];

    const taskRepository = await getRepository(Task); 
    const labelRepository = await getRepository(Label);

  try{  
    if (labelIds != undefined && labelIds.length > 0){    
      const labels = await labelRepository.findByIds(labelIds);
      task.labels = labels;
    }
    const updatedTask = await taskRepository.save(task);
    
    res.send({
      data: updatedTask,
    });
    }catch{
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const getTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const taskRepository = await getRepository(Task);
    try {
      const task = await taskRepository.findOneOrFail(taskId);
      res.send({
      data:task,
      });
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const deleteTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const taskRepository = await getRepository(Task);
   
    try {
      const task = await taskRepository.findOneOrFail(taskId);
      await taskRepository.remove(task);
      res.send({});
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  //TODO
  export const deleteLabelOfTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const {labelIds} = req.body;

    const taskRepository = await getRepository(Task);
    const labelRepository = await getRepository(Label);
   
    try {
      const labelsToRemove = await labelRepository.findByIds(labelIds);
      const task = await taskRepository.findOneOrFail(taskId);
      
      if (labelIds != undefined && labelIds.length > 0){   
        
        for (let i=0; i<task.labels.length; i++) {
          for (let j=0; j<labelsToRemove.length; j++){
              if(labelsToRemove[j].id == task.labels[i].id){
                if(i==0){
                  task.labels = task.labels.slice(1, task.labels.length);
                }else{
                  if(i==task.labels.length-1){
                    task.labels = task.labels.slice(0, task.labels.length-1);
                  }else{
                    task.labels = (task.labels).slice(0,i).concat((task.labels).slice(i+1,task.labels.length)); 
                  } 
                }
              }
          }
        }
      }
      const updatedTask = await taskRepository.save(task);

      res.send({
        data:updatedTask,
        });
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const patchTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const {name, description, labelIds} = req.body;

    const taskRepository = await getRepository(Task);
    const labelRepository = await getRepository(Label);

    try {
    let task = await taskRepository.findOneOrFail(taskId);
    task.name = name;
    task.description = description;
    task.labels = [];
 
    if (labelIds != undefined && labelIds.length > 0){
      const labels = await labelRepository.findByIds(labelIds);
      task.labels.push(... labels); 
    }
    
    task = await taskRepository.save(task);

    res.send({
      data:task,
    });
    
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const getLabelsOfTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const taskRepository = await getRepository(Task);
    try {
      const task = await taskRepository.findOneOrFail(taskId);
      res.send({
      data:task.labels
      });
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  
  export const getTrackingsOfTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const taskRepository = await getRepository(Task);
    try {
      const task = await taskRepository.findOneOrFail(taskId);
      res.send({
      data:task.trackings
      });
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }