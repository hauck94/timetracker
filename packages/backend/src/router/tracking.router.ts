import { Router } from "express";
import {
  getTrackings,
  createTracking,
  getTracking,
  deleteTracking,
  patchTracking,
} from "../controller/tracking.controller";

export const trackingRouter = Router({ mergeParams: true });

//get all 
trackingRouter.get("/", getTrackings);

// create 
trackingRouter.post("/", createTracking);

// get single 
trackingRouter.get("/:trackingId", getTracking);

// delete single 
trackingRouter.delete("/:trackingId", deleteTracking);

// patch single 
trackingRouter.patch("/:trackingId", patchTracking);
