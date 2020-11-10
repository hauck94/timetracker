import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  patchLabel,
  patchTask,
} from "../controller/task.controller";

export const taskRouter = Router({ mergeParams: true });

taskRouter.get("/", getTasks);

taskRouter.post("/", createTask);

taskRouter.get("/:taskId", getTask);

taskRouter.delete("/:taskId", deleteTask);

taskRouter.patch("/:taskId", patchTask);

// add Labels 
taskRouter.patch("/:taskId/label/:labelId", patchLabel)

