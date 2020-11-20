import { getRepository } from 'typeorm';
import { Label } from '../entity/label';
import { Request, Response } from 'express';
import { Task } from '../entity/task';


export const getLabels = async (_: Request, res: Response) => {
    const labelRepository = await getRepository(Label);
    const label = await labelRepository.find();
    res.send({
      data:label,
    });
  };

export const createLabel = async (req: Request, res: Response) => {
    const {name} = req.body;

    const label = new Label();
    label.name = name;

    const labelRepository = await getRepository(Label);
    const createdLabel = await labelRepository.save(label);
    res.send({
      data: createdLabel,
    });
  }

  export const getLabel = async (req: Request, res: Response) => {
    const labelId = req.params.labelId;
    const labelRepository = await getRepository(Label);
    try {
      const label = await labelRepository.findOneOrFail(labelId);
      res.send({
      data:label,
      });
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const deleteLabel = async (req: Request, res: Response) => {
    const labelId = req.params.labelId;
    const labelRepository = await getRepository(Label);
   
    try {
      const label = await labelRepository.findOneOrFail(labelId);
      await labelRepository.remove(label);
      res.send({});
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const deleteLabelFromTask = async (req: Request, res: Response) => {
    const labelId = req.params.labelId;
    const labelRepository = await getRepository(Label);
   
    try {
      const label = await labelRepository.findOneOrFail(labelId);
      await labelRepository.remove(label);
      res.send({});
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const patchLabel = async (req: Request, res: Response) => {
    const labelId = req.params.labelId;
    const {name} = req.body;

    const labelRepository = await getRepository(Label);
    try {
    let label = await labelRepository.findOneOrFail(labelId);
    label.name = name;
    
    label = await labelRepository.save(label);

    res.send({
      data:label,
    });
    
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  //TODO
  export const getTasksOfLabel = async (req: Request, res: Response) => {
    const labelId = req.params.labelId;
    let taskContainsTheLabel = false;
    try {
    const tasksWithLabel = await getRepository(Task)
      .createQueryBuilder("task")
      .leftJoinAndSelect("task.labels", "label")
      .getMany();
    
      let tasks: Task[] = [];
      tasksWithLabel.forEach((taskWithLabel) => {
        taskWithLabel.labels.forEach((label) => {
          if (String(label.id) == labelId) {
            tasks.push(taskWithLabel);
            taskContainsTheLabel = true;
          }
        });
      });
      if(!taskContainsTheLabel){
        throw Error();
      }
      res.send({
        data: tasks,
      });
    } catch (error) {
      res.status(404).send({
        status: "not_found",
      });
    }
  };