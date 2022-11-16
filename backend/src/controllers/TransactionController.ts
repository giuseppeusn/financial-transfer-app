import { Request, Response } from "express";
import { StatusCodes } from "../utils/HttpStatusCode";
import TransactionService from "../services/TransactionService";
import { validateToken } from "../utils/Token";
import UserService from "../services/UserService";

export default class TransactionController {
  public transactionService = new TransactionService();
  public userService = new UserService();

  public createTransaction = async (req: Request, res: Response) => {
    const { username, value } = req.body;
    const { authorization } = req.headers;

    const { id } = validateToken(authorization);
    const user = await this.userService.getUserByUsername(username);

    const transaction = await this.transactionService.createTransaction(id, user?.id, value);

    return res.status(StatusCodes.CREATED).json(transaction);
  }

  public getTransactionsById = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    const { id } = validateToken(authorization);

    const transactions = await this.transactionService.getTransactionsById(id);

    return res.status(StatusCodes.OK).json(transactions);
  }
}