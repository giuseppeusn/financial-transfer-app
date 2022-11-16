import { PrismaClient, Transactions } from "@prisma/client";
import { TransactionSchema } from "../interfaces/ITransaction";
import { ErrorTypes } from "../errors/Catalog";
import serializTransactions from "../utils/SerializeTransactions";
import TransactionManagement from "../interfaces/TransactionManagement";

export default class TransactionService {
  public prisma = new PrismaClient();

  public createTransaction = async (debitedAccountId: number, creditedAccountId: number, value: number): Promise<Transactions> => {
    if (debitedAccountId === creditedAccountId) {
      throw Error(ErrorTypes.InvalidTransaction);
    }

    const parsed = TransactionSchema.safeParse({ debitedAccountId, creditedAccountId, value });

    if (!parsed.success) {
      throw parsed.error;
    }

    return await this.prisma.$transaction(async (tx) => {
      const accountDebited = await tx.accounts.update({
        where: {
          id: debitedAccountId,
        },
        data: {
          balance: {
            decrement: value.toFixed(2),
          }
        }
      });

      if (Number(accountDebited.balance) < 0) {
        throw Error(ErrorTypes.InsufficientFunds);
      }

      await tx.accounts.update({
        where: {
          id: creditedAccountId,
        },
        data: {
          balance: {
            increment: value.toFixed(2),
          }
        }
      });
    
      const transaction = await tx.transactions.create({
        data: {
          debitedAccountId,
          creditedAccountId,
          value: value.toFixed(2),
        },
      });

      return transaction;
    });
  }

  public getTransactionsById = async (id: number): Promise<TransactionManagement[]> => {
    const transactions = await this.prisma.transactions.findMany({
      where: {
        OR: [
          {
            debitedAccountId: id,
          },
          {
            creditedAccountId: id,
          }
        ]
      },
    });

    const serialized = await serializTransactions(transactions, id);
    
    return serialized;
  }
}