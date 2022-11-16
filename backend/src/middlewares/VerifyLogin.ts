import { NextFunction, Request, Response } from "express";
import { LoginSchema } from "../interfaces/ILogin";

export default function verifyLogin(req: Request, _res: Response, next: NextFunction) {
  const { username, password } = req.body;

  const parsed = LoginSchema.safeParse({ username, password });

  if (!parsed.success) {
    throw parsed.error;
  }

  next();
}