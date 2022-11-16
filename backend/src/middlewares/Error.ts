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
    return res.status(400).json({ message: err.issues[0].message });
  }

  if (err instanceof JsonWebTokenError) { 
    return res.status(401).json({ message: err.message });
  }

  const messageAsErrorType = err.message as ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { httpStatus, message } = mappedError;

    return res.status(httpStatus).json({ message });
  }

  console.error(err);

  return res.status(500).end();
};

export default errorHandler;