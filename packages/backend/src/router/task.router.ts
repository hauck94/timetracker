import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  patchLabel,
  patchTask,
  getLabels,
  getTrackings
} from "../controller/task.controller";

export const taskRouter = Router({ mergeParams: true });

taskRouter.get("/", getTasks);

taskRouter.post("/", createTask);

taskRouter.get("/:taskId", getTask);

taskRouter.delete("/:taskId", deleteTask);

// possible to add label or multiple labels 
taskRouter.patch("/:taskId", patchTask);

// add single Label
taskRouter.patch("/:taskId/label/:labelId", patchLabel);

// get Labels
taskRouter.get("/:taskId/labels", getLabels);

//TODO get Trackings 
taskRouter.get("/:taskId/trackings", getTrackings);