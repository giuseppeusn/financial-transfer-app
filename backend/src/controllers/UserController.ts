import UserService from "../services/UserService";
import { Request, Response } from "express";
import { StatusCodes } from "../utils/HttpStatusCode";
import { ErrorTypes } from "../errors/Catalog";

export default class UserController {
  public userService = new UserService();

  public registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await this.userService.registerUser(username, password);

    return res.status(StatusCodes.CREATED).json({ token });
  }

  public loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await this.userService.loginUser(username, password);

    if (!token) {
      throw Error(ErrorTypes.InvalidCredentials);
    }

    return res.status(StatusCodes.OK).json({ token });
  }
}