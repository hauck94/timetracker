import { Router } from "express";
import {
  getLabels,
  createLabel,
  getLabel,
  deleteLabel,
  patchLabel,
  getTasks,
} from "../controller/label.controller";

export const labelRouter = Router({ mergeParams: true });

//get all Tasks
labelRouter.get("/", getLabels);

// create Task
labelRouter.post("/", createLabel);

// get single Task
labelRouter.get("/:labelId", getLabel);

// delete single Task
labelRouter.delete("/:labelId", deleteLabel);

// patch single Task
labelRouter.patch("/:labelId", patchLabel);

// get all tasks
labelRouter.get("/:labelId", getTasks);