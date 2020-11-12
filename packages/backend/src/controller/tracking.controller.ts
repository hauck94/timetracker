import { getRepository } from 'typeorm';
import { Tracking } from '../entity/tracking';
import { Request, Response } from 'express';


export const getTrackings = async (_: Request, res: Response) => {
    const trackingRepository = await getRepository(Tracking);
    const tracking = await trackingRepository.find();
    res.send({
      data:tracking,
    });
  };

export const createTracking = async (req: Request, res: Response) => {
    const {name, description} = req.body;

    const tracking = new Tracking();
    tracking.name = name;
    tracking.description = description;

    const trackingRepository = await getRepository(Tracking);
    const createdTracking = await trackingRepository.save(tracking);
    res.send({
      data: createdTracking,
    });
  }

  export const getTracking = async (req: Request, res: Response) => {
    const trackingId = req.params.trackingId;
    const trackingRepository = await getRepository(Tracking);
    try {
      const tracking = await trackingRepository.findOneOrFail(trackingId);
      res.send({
      data:tracking,
      });
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const deleteTracking = async (req: Request, res: Response) => {
    const trackingId = req.params.trackingId;
    const trackingRepository = await getRepository(Tracking);
   
    try {
      const tracking = await trackingRepository.findOneOrFail(trackingId);
      await trackingRepository.remove(tracking);
      res.send({});
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const patchTracking = async (req: Request, res: Response) => {
    const trackingId = req.params.trackingId;
    const {name, description} = req.body;

    const trackingRepository = await getRepository(Tracking);
    try {
    let tracking = await trackingRepository.findOneOrFail(trackingId);
    tracking.name = name;
    tracking.description = description;
    
    tracking = await trackingRepository.save(tracking);

    res.send({
      data:tracking,
    });
    
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }