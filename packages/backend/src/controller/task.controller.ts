import { getRepository } from "typeorm";
import { Task } from "../entity/task";
import { Request, Response } from "express";

export const getTasks = async (_: Request, res: Response) => {
    const taskRepository = await getRepository(Task);
    const tasks = await taskRepository.find();
    res.send({
      data: tasks,
    });
  }

  export const createTask = async (req: Request, res: Response) => {
    let { name, description } = req.body;

    let task = new Task();
    task.name = name;
    task.description = description;

    const taskRepository = await getRepository(Task);
    const createdTask = await taskRepository.save(task);

    res.send({
      data: createdTask,
    });
  }

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
  }

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
  }

  export const patchTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;

    let { name, description } = req.body;

    const taskRepository = await getRepository(Task);
    try {
      let task = await taskRepository.findOneOrFail(taskId);
      task.name = name;
      task.description = description;

      task = await taskRepository.save(task);
      res.send({
        data: task,
      });
    } catch (error) {
      res.status(404).send({
        status: "not_found",
      });
    }
  }