import { Router } from "express";
import { taskRouter } from "./task.router";
import { Request, Response } from "express";


export const globalRouter = Router({ mergeParams: true });


globalRouter.get("/", async (_: Request, res: Response) => {
    res.send({message: 'Say hi to the API'});
  });

// mergeParams true damit die parameter übergeben werden 
//leitet zu task Router weiter
globalRouter.use('/task', taskRouter);
