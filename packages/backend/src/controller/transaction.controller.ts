import { getRepository } from 'typeorm';
import { Transaction } from '../entity/transaction';
import { Request, Response } from 'express';


export const getTransactions = async (_: Request, res: Response) => {
    const transactionRepository = await getRepository(Transaction);
    const transactions = await transactionRepository.find();
    res.send({
      data:transactions,
    });
  };

export const createTransaction = async (req: Request, res: Response) => {
    const {name, value, description, type} = req.body;

    const transaction = new Transaction();
    transaction.name = name;
    transaction.value = value;
    transaction.description = description;
    transaction.type = type;

    const transactionRepository = await getRepository(Transaction);
    const createdTransaction = await transactionRepository.save(transaction);
    res.send({
      data: createdTransaction,
    });
  }

  export const getTransaction = async (req: Request, res: Response) => {
    const transactionId = req.params.transactionId;
    const transactionRepository = await getRepository(Transaction);
    try {
      const transaction = await transactionRepository.findOneOrFail(transactionId);
      res.send({
      data:transaction,
      });
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const deleteTransaction = async (req: Request, res: Response) => {
    const transactionId = req.params.transactionId;
    const transactionRepository = await getRepository(Transaction);
   
    try {
      const transaction = await transactionRepository.findOneOrFail(transactionId);
      await transactionRepository.remove(transaction);
      res.send({});
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }

  export const patchTransaction = async (req: Request, res: Response) => {
    const transactionId = req.params.transactionId;
    const {name, value, description, type} = req.body;

    const transactionRepository = await getRepository(Transaction);
    try {
    let transaction = await transactionRepository.findOneOrFail(transactionId);
    transaction.name = name;
    transaction.value = value;
    transaction.description = description;
    transaction.type = type;
    
    transaction = await transactionRepository.save(transaction);

    res.send({
      data:transaction,
    });
    
    } catch (e) {
      res.status(404).send({
          status: 'not found'
      });
    }
  }