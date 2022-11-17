import { PrismaClient, Users } from '@prisma/client';
import generateToken from '../utils/Token';
import { ErrorTypes } from '../errors/Catalog';
import { hashPassword, comparePassword } from '../utils/Crypt';
import IUser from '../interfaces/IUser';
import { RegisterSchema } from '../interfaces/IRegister';

export default class UserService {
  public prisma = new PrismaClient();

  public registerUser = async (username: string, password: string): Promise<IUser> => {
    const encryptedPassword = await hashPassword(password);

    const existUser = await this.getUserByUsername(username);

    if (existUser) {
      throw Error(ErrorTypes.AlreadyExist);
    }

    const parsed = RegisterSchema.safeParse({ username, password });

    if (!parsed.success) {
      throw parsed.error;
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
      },
      include: {
        accounts: false,
      }
    });

    const token = generateToken(user.accountId, user.username);

    return { username: user.username, token };
  }

  public getUserByUsername = async (username: string): Promise<Users | null> => {
    const user = await this.prisma.users.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        }
      }
    });

    return user;
  }

  public getUserById = async (accountId: number): Promise<Users | null> => {
    const user = await this.prisma.users.findUnique({
      where: {
        accountId,
      }
    });

    return user;
  }

  public loginUser = async (username: string, password: string): Promise<IUser | null> => {
    const user = await this.getUserByUsername(username);

    if (user) {
      const isPasswordValid = await comparePassword(password, user.password);

      if (isPasswordValid) {
        const token = generateToken(user.accountId, user.username);

        return { username: user.username, token };
      }

      return null; 
    }

    return null;    
  }
}