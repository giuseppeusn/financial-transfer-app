import { PrismaClient, Users } from '@prisma/client';
import { ErrorTypes } from '../errors/Catalog';
import { ILogin, LoginSchema } from '../interfaces/ILogin';
// import { hashPassword } from '../utils/crypt';

export default class UserService {
  public prisma = new PrismaClient();

  public registerUser = async (username: string, password: string): Promise<Users> => {
    // const encryptedPassword = await hashPassword(password);

    const parsed = LoginSchema.safeParse({ username, password });

    if (!parsed.success) {
      throw parsed.error;
    }

    const existUser = await this.getUserByUsername(username);

    if (existUser) {
      throw Error(ErrorTypes.AlreadyExist);
    }

    const user = await this.prisma.users.create({
      data: {
        username,
        password,
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

    return user;
  }

  public getUserByUsername = async (username: string): Promise<Users | null> => {
    const user = await this.prisma.users.findUnique({
      where: {
        username,
      },
    });

    return user;
  }
}