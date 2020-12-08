import { getRepository } from 'typeorm';
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

function checkIfLabelExists(label : Label, labelRepoElements: Label[]) : boolean {
  let labelExists = labelRepoElements.some(elem => elem.name === label.name);
    return labelExists;
}

export const createTask = async (req: Request, res: Response) => {
    const {name, description, labels} = req.body;

    const task = new Task();
    task.name = name;
    task.description = description;
    task.labels = [];

    const taskRepository = await getRepository(Task); 
    const labelRepository = await getRepository(Label);

  try{
    const labelRepo = await labelRepository.find();

    if (labels !== undefined && !labels.empty) {
      labels.forEach(async (element: Label) => {
        if(checkIfLabelExists(element, labelRepo)){  
          labelRepo.forEach(async (label) => {
          
            if (label.name === element.name) {
              task.labels.push(label);
            }
          });
        } else {
              const newLabel = new Label;
              newLabel.name = element.name;
              const label = await labelRepository.save(newLabel);
              task.labels.push(label);
            }
      });
          await taskRepository.save(task);
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
    const {labels} = req.body;

    const taskRepository = await getRepository(Task);
    const labelRepository = await getRepository(Label);
   
    try {
      const labelsToRemove = await labelRepository.findByIds(labels);
      const task = await taskRepository.findOneOrFail(taskId);
      
      if (labels != undefined && labels.length > 0){   
        
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
      const createdTask = await taskRepository.save(task);

      res.send({
        data:createdTask,
        });
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const patchTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const {name, description, labels} = req.body;

    const taskRepository = await getRepository(Task);
    const labelRepository = await getRepository(Label);

    try {
    let task = await taskRepository.findOneOrFail(taskId);
    task.name = name;
    task.description = description;
    task.labels = [];
 
    const labelRepo = await labelRepository.find();
  
      if (labels !== undefined && !labels.empty) {
        labels.forEach(async (element: Label) => {
          if(checkIfLabelExists(element, labelRepo)){  
            labelRepo.forEach(async (label) => {
            
              if (label.name === element.name) {
                task.labels.push(label);
              }
            });
          } else {
                const newLabel = new Label;
                newLabel.name = element.name;
                const label = await labelRepository.save(newLabel);
                task.labels.push(label);
              }
        });
            await taskRepository.save(task);
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