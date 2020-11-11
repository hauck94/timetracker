import { getRepository } from "typeorm";
import { Tracking } from "../entity/tracking";
import { Request, Response } from "express";
import { Task } from "../entity/task";

export const getTrackings = async (_: Request, res: Response) => {
  const trackingRepository = await getRepository(Tracking);
  const tracking = await trackingRepository.find();
  res.send({
    data: tracking,
  });
};

export const createTracking = async (req: Request, res: Response) => {
  let { name, description } = req.body;
  const taskId = req.params.taskId;
  const taskRepository = await getRepository(Task);
  const trackingRepository = await getRepository(Tracking);
  try {
    const task = await taskRepository.findOneOrFail(taskId);
    
    let tracking = new Tracking();
    tracking.name = name;
    tracking.description = description;
    tracking.task = task;
    task.trackings.push(tracking);

    const createdTracking = await trackingRepository.save(tracking);
    await taskRepository.save(task);
    res.send({
      data: createdTracking,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const getTracking = async (req: Request, res: Response) => {
  const trackingId = req.params.trackingId;
  const trackingRepository = await getRepository(Tracking);
  try {
    const tracking = await trackingRepository.findOneOrFail(trackingId);
    res.send({
      data: tracking,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const deleteTracking = async (req: Request, res: Response) => {
  const trackingId = req.params.trackingId;
  const trackingRepository = await getRepository(Tracking);
  try {
    const tracking = await trackingRepository.findOneOrFail(trackingId);
    await trackingRepository.remove(tracking);
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const patchTracking = async (req: Request, res: Response) => {
  const trackingId = req.params.trackingId;
  let { name, description } = req.body;
  const trackingRepository = await getRepository(Tracking);
  try {
    let tracking = await trackingRepository.findOneOrFail(trackingId);
    tracking.name = name;
    tracking.description = description;

    tracking = await trackingRepository.save(tracking);
    res.send({
      data: tracking,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};
