import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  patchTask,
} from "../controller/task.controller";

export const taskRouter = Router({ mergeParams: true });

//get all Tasks
taskRouter.get("/", getTasks);

// create Task
taskRouter.post("/", createTask);

// get single Task
taskRouter.get("/:taskId", getTask);

// delete single Task
taskRouter.delete("/:taskId", deleteTask);

// patch single Task
taskRouter.patch("/:taskId", patchTask);
