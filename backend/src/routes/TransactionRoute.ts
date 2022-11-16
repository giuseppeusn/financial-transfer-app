import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';

const transactionRoute = Router();

const transactionController = new TransactionController();

transactionRoute.post('/', transactionController.createTransaction);
transactionRoute.get('/', transactionController.getTransactionsById);

export default transactionRoute;