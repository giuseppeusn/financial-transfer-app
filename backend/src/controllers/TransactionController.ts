import { Request, Response } from "express";
import { StatusCodes } from "../utils/HttpStatusCode";
import TransactionService from "../services/TransactionService";
import { validateToken } from "../utils/Token";

export default class TransactionController {
  public transactionService = new TransactionService();

  public createTransaction = async (req: Request, res: Response) => {
    const { creditedAccountId, value } = req.body;
    const { authorization } = req.headers;

    const { id } = validateToken(authorization);

    const transaction = await this.transactionService.createTransaction(id, creditedAccountId, value);

    return res.status(StatusCodes.CREATED).json(transaction);
  }

  public getTransactionsById = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    const { id } = validateToken(authorization);

    const transactions = await this.transactionService.getTransactionsById(id);

    return res.status(StatusCodes.OK).json(transactions);
  }
}