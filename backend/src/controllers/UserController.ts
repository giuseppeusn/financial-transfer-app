import UserService from "../services/UserService";
import { Request, Response } from "express";
import { StatusCodes } from "../utils/HttpStatusCode";
import { ErrorTypes } from "../errors/Catalog";
import { validateToken } from "../utils/Token";

export default class UserController {
  public userService = new UserService();

  public registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await this.userService.registerUser(username, password);

    return res.status(StatusCodes.CREATED).json(user);
  }

  public loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await this.userService.loginUser(username, password);

    if (!user) {
      throw Error(ErrorTypes.InvalidCredentials);
    }

    return res.status(StatusCodes.OK).json(user);
  }

  public validateToken = async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
      throw Error(ErrorTypes.TokenNotFound);
    }

    const { id } = validateToken(token);

    const user = await this.userService.getUserById(id); 

    if (!user) {
      throw Error(ErrorTypes.UserNotFound);
    }

    return res.status(StatusCodes.NO_CONTENT).end();
  }
}