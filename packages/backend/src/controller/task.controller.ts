import { getRepository } from "typeorm";
import { Task } from "../entity/task";
import { Request, Response } from "express";
import { Label } from "../entity/label";

export const getTasks = async (_: Request, res: Response) => {
  const taskRepository = await getRepository(Task);
  const tasks = await taskRepository.find();
  res.send({
    data: tasks,
  });
};

export const createTask = async (req: Request, res: Response) => {
  let { name, description, labelIds } = req.body;

  let task = new Task();
  task.name = name;
  task.description = description;
  task.labels = [];
  const taskRepository = await getRepository(Task);
  const labelRepository = await getRepository(Label);
  try {
    
    if(labelIds != undefined && !labelIds.empty){
      const labels = await labelRepository.findByIds(labelIds);
      task.labels.push(...labels);
    }
    const createdTask = await taskRepository.save(task);
    res.send({
      data: createdTask,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const taskRepository = await getRepository(Task);
  try {
    const task = await taskRepository.findOneOrFail(taskId);
    res.send({
      data: task,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const taskRepository = await getRepository(Task);
  try {
    const task = await taskRepository.findOneOrFail(taskId);
    await taskRepository.remove(task);
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const patchTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;

  let { name, description, labelIds } = req.body;

  const taskRepository = await getRepository(Task);
  const labelRepository = await getRepository(Label);
  try {
    let task = await taskRepository.findOneOrFail(taskId);
    task.name = name;
    task.description = description;

    if(labelIds != undefined && !labelIds.empty){
      const labels = await labelRepository.findByIds(labelIds);
      task.labels.push(...labels);
    }

    task = await taskRepository.save(task);
    res.send({
      data: task,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const patchLabel = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const labelId = req.params.labelId;

  const taskRepository = await getRepository(Task);
  const labelRepository = await getRepository(Label);
  try {
    let task = await taskRepository.findOneOrFail(taskId);

    let label = await labelRepository.findOneOrFail(labelId);

    task.labels.push(label);

    task = await taskRepository.save(task);
    console.log(task);
    res.send({
      data: task,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      status: "not_found",
    });
  }
};


export const getLabels = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;

  const taskRepository = await getRepository(Task);
  try {
    let task = await taskRepository.findOneOrFail(taskId);

    res.send({
      data: task.labels,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      status: "not_found",
    });
  }
};


export const getTrackings = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;

  const taskRepository = await getRepository(Task);
  try {
    let task = await taskRepository.findOneOrFail(taskId);

    res.send({
      data: task.trackings,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      status: "not_found",
    });
  }
};