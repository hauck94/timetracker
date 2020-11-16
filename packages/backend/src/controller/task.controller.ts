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
  let { name, description, label } = req.body;

  let task = new Task();
  task.name = name;
  task.description = description;
  task.labels = [];
  const taskRepository = await getRepository(Task);
  const labelRepository = await getRepository(Label);
  try {
    if (label != undefined && label.length > 0) {
      const labels = await labelRepository.findByIds(label);
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

  let { name, description, label } = req.body;

  const taskRepository = await getRepository(Task);
  const labelRepository = await getRepository(Label);
  try {
    let task = await taskRepository.findOneOrFail(taskId);

    task.name = name;
    task.description = description;

    if (label != undefined && !label.empty) {
      const labels = await labelRepository.findByIds(label);
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

export const getLabels = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;

  const taskRepository = await getRepository(Task);
  try {
    let task = await taskRepository.findOneOrFail(taskId);

    res.send({
      data: task.labels,
    });
  } catch (error) {
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
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const deleteLabel = async (req: Request, res: Response) => {
  const taskId = req.params.trackingId;
  let { label } = req.body;
  const taskRepository = await getRepository(Task);
  const labelRepository = await getRepository(Label);
  let atleastOneLabel = false;
  try {
    let task = await taskRepository.findOneOrFail(taskId);

    if (label != undefined && !label.empty && task.labels.length > 0) {
      const labels = await labelRepository.findByIds(label);
      // filtering labels
      //task.labels= task.labels.filter((obj) => !labels.includes(obj));
      labels.forEach((element) => {
        task.labels.forEach((label) => {
          if (label.id == element.id) {
            const index = task.labels.indexOf(label);
            if (index > -1) {
              task.labels.splice(index, 1);
              atleastOneLabel = true;
            }
          }
        });
      });
      if (atleastOneLabel) {
        await taskRepository.save(task);
      } else {
        throw Error();
      }
    } else {
      throw Error();
    }
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};
