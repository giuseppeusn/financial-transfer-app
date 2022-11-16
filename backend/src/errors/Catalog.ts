import { StatusCodes } from "../utils/HttpStatusCode";

export enum ErrorTypes {
  AlreadyExist = 'AlreadyExist',
  InvalidToken = 'InvalidToken',
  InvalidCredentials = 'InvalidCredentials',
}

type ErrorResponseObject = { 
  error: string;
  httpStatus: number
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  AlreadyExist: {
    error: 'Username already exist',
    httpStatus: StatusCodes.CONFLICT,
  },
  InvalidToken: {
    error: 'Invalid token',
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
  InvalidCredentials: {
    error: 'Invalid username or password',
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
};