import { Router } from 'express';
import { 
    getTransaction,
    getTransactions,
    createTransaction,
    deleteTransaction,
    patchTransaction 
} from '../controller/transaction.controller';


export const transactionRouter = Router({ mergeParams: true });


    //alle transaktionen anzeigen
    transactionRouter.get('/', getTransactions);
  
    //transaktion anlegen
    transactionRouter.post('/', createTransaction);
  
    //bestimmte transaktion über id anzeigen
    transactionRouter.get('/:transactionId', getTransaction);
      
    //transaktionen löschen
    transactionRouter.delete('/:transactionId', deleteTransaction);
  
    //transaktion updaten
    transactionRouter.patch('/:transactionId', patchTransaction);
  
  