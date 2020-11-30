import { Request, Response, Router } from 'express';
import { taskRouter } from './task.router';
import { labelRouter } from './label.router';
import { trackingRouter } from './tracking.router';

export const globalRouter = Router({ mergeParams: true });

globalRouter.get('/', async (_: Request, res: Response) => {
  res.send({ message: 'hi from the api' });
});

// mergeParams true damit die parameter übergeben werden
// leitet zu task Router weiter
globalRouter.use('/task', taskRouter);
globalRouter.use('/label', labelRouter);
globalRouter.use('/tracking', trackingRouter);
