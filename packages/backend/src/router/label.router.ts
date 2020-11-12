import { Router } from 'express';
import { 
    getLabel,
    getLabels,
    createLabel,
    deleteLabel,
    patchLabel 
} from '../controller/label.controller';


export const labelRouter = Router({ mergeParams: true });


    //alle transaktionen anzeigen
    labelRouter.get('/', getLabels);
  
    //transaktion anlegen
    labelRouter.post('/', createLabel);
  
    //bestimmte transaktion über id anzeigen
    labelRouter.get('/:labelId', getLabel);
      
    //transaktionen löschen
    labelRouter.delete('/:labelId', deleteLabel);
  
    //transaktion updaten
    labelRouter.patch('/:labelId', patchLabel);
  
  