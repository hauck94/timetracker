import { Router, Request, Response } from "express";
import { trackingRouter } from "./tracking.router";
import { taskRouter } from "./task.router";
import { labelRouter } from "./label.router";

export const globalRouter = Router({ mergeParams: true });

globalRouter.use('/task', taskRouter);
globalRouter.use('/tracking', trackingRouter);
globalRouter.use('/label', labelRouter);

globalRouter.get('/', async (_: Request, res: Response) => {
    res.send({message: 'Hello api'});
  });