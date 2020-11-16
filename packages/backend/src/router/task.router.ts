import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  patchTask,
  getLabels,
  getTrackings,
  deleteLabel,
} from "../controller/task.controller";

export const taskRouter = Router({ mergeParams: true });

taskRouter.get("/", getTasks);

taskRouter.post("/", createTask);

taskRouter.get("/:taskId", getTask);

taskRouter.delete("/:taskId", deleteTask);

// possible to add label or multiple labels
taskRouter.patch("/:taskId", patchTask);

// get Labels
taskRouter.get("/labels/:taskId", getLabels);

//TODO get Trackings
taskRouter.get("/trackings/:taskId", getTrackings);

// TODO delete singel or multiple label(s)
taskRouter.delete("/labels/:trackingId", deleteLabel);
