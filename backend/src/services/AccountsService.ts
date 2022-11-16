import { Accounts, PrismaClient } from "@prisma/client";
import { ErrorTypes } from "../errors/Catalog";

export default class AccountsService {
  public prisma = new PrismaClient();

  public getAccountById = async (accountId: number): Promise<Accounts> => {
    const account = await this.prisma.accounts.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!account) {
      throw Error(ErrorTypes.UserNotFound);
    }

    return account;
  }
}