import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/Catalog';

const errorHandler: ErrorRequestHandler = ( 
  err: Error | ZodError, 
  _req,
  res,
  _next,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ code: err.issues[0].code, message: err.issues[0].message });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ code: "jwt_error", message: err.message });
  }

  const messageAsErrorType = err.message as ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { code, httpStatus, message } = mappedError;

    return res.status(httpStatus).json({ code, message });
  }

  console.error(err);

  return res.status(500).end();
};

export default errorHandler;