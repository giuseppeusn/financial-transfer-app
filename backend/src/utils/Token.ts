import * as jwt from 'jsonwebtoken';
import { Secret, SignOptions } from 'jsonwebtoken';
import { ErrorTypes } from '../errors/Catalog';
import IJwtPayload from '../interfaces/IJwtPayload';

const SECRET: Secret = process.env.JWT_SECRET || 'default_pass';

const generateToken = (id: number | undefined, username: string) => {
  const JWT_CONFIG: SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ id, username }, SECRET, JWT_CONFIG);

  return token;
};

export const validateToken = (token: string | undefined): IJwtPayload => { 
  if (token) {      
    const { id } = jwt.verify(token, SECRET) as IJwtPayload;

    return { id };
  }

  throw Error(ErrorTypes.TokenNotFound);
};

export default generateToken;
