import { PrismaClient, Users } from '@prisma/client';
import generateToken from '../utils/Token';
import { ErrorTypes } from '../errors/Catalog';
import { hashPassword, comparePassword } from '../utils/Crypt';

export default class UserService {
  public prisma = new PrismaClient();

  public registerUser = async (username: string, password: string): Promise<string> => {
    const encryptedPassword = await hashPassword(password);

    const existUser = await this.getUserByUsername(username);

    if (existUser) {
      throw Error(ErrorTypes.AlreadyExist);
    }

    const user = await this.prisma.users.create({
      data: {
        username,
        password: encryptedPassword,
        accounts: {
          create: {
            balance: 100.00,
          }
        }
      }
    });

    const token = generateToken(user.accountId, user.username);

    return token;
  }

  public getUserByUsername = async (username: string): Promise<Users | null> => {
    const user = await this.prisma.users.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  public loginUser = async (username: string, password: string): Promise<string | null> => {
    const user = await this.getUserByUsername(username);

    if (user) {
      const isPasswordValid = await comparePassword(password, user.password);

      if (isPasswordValid) {
        const token = generateToken(user.accountId, user.username);

        return token;
      }

      return null; 
    }

    return null;    
  }
}