import { Router, Request, Response } from "express";
import { transactionRouter } from "./transaction.router";

export const globalRouter = Router({ mergeParams: true });

globalRouter.use('/transaction', transactionRouter);

globalRouter.get('/', async (_: Request, res: Response) => {
    res.send({message: 'Hello api'});
  });