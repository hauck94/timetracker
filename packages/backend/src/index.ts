// tslint:disable-next-line: no-var-requires
require("dotenv-safe").config();
import express, { Request, Response } from "express";
import "reflect-metadata";
import { getRepository } from "typeorm";
import { Task } from "./entity/task";
import { createDatabaseConnection } from "./util/createDatabaseConnection";
import * as bodyParser from "body-parser";

const port: number = Number(process.env.PORT);

export const startServer = async () => {
  try {
    const app = express();
    const dbConnection = await createDatabaseConnection();

    app.use(bodyParser.json());

    app.get("/", async (_: Request, res: Response) => {
      res.send("Say hi to the API");
    });

    //get all Tasks
    app.get("/task", async (_: Request, res: Response) => {
      const taskRepository = await getRepository(Task);
      const tasks = await taskRepository.find();
      res.send({
        data: tasks,
      });
    });
    // create Task
    app.post("/task", async (req: Request, res: Response) => {
      let { name, description } = req.body;

      let task = new Task();
      task.name = name;
      task.description = description;

      const taskRepository = await getRepository(Task);
      const createdTask = await taskRepository.save(task);

      res.send({
        data: createdTask,
      });
    });

    // get single Task
    app.get("/task/:taskId", async (req: Request, res: Response) => {
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
    });

    // delete single Task
    app.delete("/task/:taskId", async (req: Request, res: Response) => {
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
    });

    // patch single Task
    app.patch("/task/:taskId", async (req: Request, res: Response) => {
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
    });

    const server = app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    );
    return { server, dbConnection };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// tslint:disable-next-line: no-floating-promises
startServer();
