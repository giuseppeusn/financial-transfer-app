import { StatusCodes } from "../utils/HttpStatusCode";

export enum ErrorTypes {
  AlreadyExist = 'AlreadyExist',
  InvalidToken = 'InvalidToken',
  InvalidCredentials = 'InvalidCredentials',
  UserNotFound = 'UserNotFound',
  InsufficientFunds = 'InsufficientFunds',
  InvalidTransaction = 'InvalidTransaction',
  TokenNotFound = 'TokenNotFound',
}

type ErrorResponseObject = { 
  message: string;
  httpStatus: number
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  AlreadyExist: {
    message: 'username already exist',
    httpStatus: StatusCodes.CONFLICT,
  },
  InvalidToken: {
    message: 'invalid token',
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
  InvalidCredentials: {
    message: 'invalid username or password',
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
  UserNotFound: {
    message: 'user not found',
    httpStatus: StatusCodes.NOT_FOUND,
  },
  InsufficientFunds: {
    message: 'insufficient funds',
    httpStatus: StatusCodes.BAD_REQUEST,
  },
  InvalidTransaction: {
    message: 'invalid transaction: you can\'t transfer money between same accounts',
    httpStatus: StatusCodes.BAD_REQUEST,
  },
  TokenNotFound: {
    message: 'token not found',
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
};