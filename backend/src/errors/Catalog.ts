export enum ErrorTypes {
  AlreadyExist = 'AlreadyExist',
}

type ErrorResponseObject = { 
  error: string;
  httpStatus: number
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  AlreadyExist: {
    error: 'Username already exist',
    httpStatus: 409,
  },
};