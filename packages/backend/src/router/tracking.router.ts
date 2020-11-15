import { Router } from 'express';
import { 
    getTracking,
    getTrackings,
    createTracking,
    deleteTracking,
    patchTracking 
} from '../controller/tracking.controller';


export const trackingRouter = Router({ mergeParams: true });


    //alle transaktionen anzeigen
    trackingRouter.get('/', getTrackings);
  
    //transaktion anlegen
    trackingRouter.post('/:taskId', createTracking);
  
    //bestimmte transaktion über id anzeigen
    trackingRouter.get('/:trackingId', getTracking);
      
    //transaktionen löschen
    trackingRouter.delete('/:trackingId', deleteTracking);
  
    //transaktion updaten
    trackingRouter.patch('/:trackingId', patchTracking);
  
  