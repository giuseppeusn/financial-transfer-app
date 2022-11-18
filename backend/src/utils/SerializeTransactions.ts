import { Transactions } from "@prisma/client";
import TransactionManagement from "../interfaces/TransactionManagement";
import UserService from "../services/UserService";

const getData = (data: Date) => data.toLocaleDateString("pt-BR", {timeZone: "America/Sao_Paulo"});

const getHours = (data: Date) => data.toLocaleTimeString("pt-BR", {timeZone: "America/Sao_Paulo", hour: '2-digit', minute: '2-digit'});

const serializeTransactions = async (transactions: Transactions[], id: number) => {
  const userService = new UserService();

  return await Promise.all(transactions.map(async (transaction) => {
    if (transaction.debitedAccountId !== id) {
      const debitedName = await userService.getUserById(transaction.debitedAccountId);

      return {
        id: transaction.id,
        name: debitedName?.username,
        value: transaction.value,
        type: 'cash-in',
        date: getData(transaction.createdAt),
        hour: getHours(transaction.createdAt),
      }
    } else {
      const creditedName = await userService.getUserById(transaction.creditedAccountId);

      return {
        id: transaction.id,
        name: creditedName?.username,
        value: transaction.value,
        type: 'cash-out',
        date: getData(transaction.createdAt),
        hour: getHours(transaction.createdAt),
      }
    }
  }));
}

export default serializeTransactions;