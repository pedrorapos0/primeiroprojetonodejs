import { Router } from 'express';

 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(transactionsRepository);

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.json({transactions, balance});
    // TODO
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const {title, type, value} = request.body;
    const transaction =  createTransactionService.execute({title, type, value: parseInt(value)});
    return response.json(transaction);
    // TODO
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
