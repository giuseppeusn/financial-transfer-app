import UserService from "../services/UserService";
import { Request, Response } from "express";
import { StatusCodes } from "../utils/HttpStatusCode";

export default class UserController {
  public userService = new UserService();

  public registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await this.userService.registerUser(username, password);

    return res.status(StatusCodes.CREATED).json(user);
  }
}