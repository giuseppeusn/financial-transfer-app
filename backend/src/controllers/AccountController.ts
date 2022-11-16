import { Request, Response } from "express";
import { StatusCodes } from "../utils/HttpStatusCode";
import AccountsService from "../services/AccountsService";
import { validateToken } from "../utils/Token";

export default class AccountController {
  public accountsService = new AccountsService();

  public getAccountById = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    const { id } = validateToken(authorization);

    const account = await this.accountsService.getAccountById(id);

    return res.status(StatusCodes.OK).json(account);
  }
}