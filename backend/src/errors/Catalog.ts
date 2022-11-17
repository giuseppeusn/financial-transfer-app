import { StatusCodes } from "../utils/HttpStatusCode";

export enum ErrorTypes {
  AlreadyExist = 'AlreadyExist',
  InvalidCredentials = 'InvalidCredentials',
  UserNotFound = 'UserNotFound',
  InsufficientFunds = 'InsufficientFunds',
  InvalidTransaction = 'InvalidTransaction',
  TokenNotFound = 'TokenNotFound',
}

type ErrorResponseObject = { 
  code: string;
  message: string;
  httpStatus: number
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  AlreadyExist: {
    code: 'user_exist',
    message: 'username already exist in database',
    httpStatus: StatusCodes.CONFLICT,
  },
  InvalidCredentials: {
    code: 'invalid_credentials',
    message: 'invalid username or password',
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
  UserNotFound: {
    code: 'user_not_found',
    message: 'user not found in database',
    httpStatus: StatusCodes.NOT_FOUND,
  },
  InsufficientFunds: {
    code: 'insufficient_funds',
    message: 'account has insufficient funds',
    httpStatus: StatusCodes.BAD_REQUEST,
  },
  InvalidTransaction: {
    code: 'invalid_transaction',
    message: 'invalid transaction: you can\'t transfer money between same accounts',
    httpStatus: StatusCodes.BAD_REQUEST,
  },
  TokenNotFound: {
    code: 'token_not_found',
    message: 'token not found in header request',
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
};