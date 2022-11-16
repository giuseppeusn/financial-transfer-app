import { Transactions } from "@prisma/client";
import UserService from "../services/UserService";

const getData = (data: Date) => data.toLocaleDateString("pt-BR", {timeZone: "America/Sao_Paulo"});

const getHours = (data: Date) => data.toLocaleTimeString("pt-BR", {timeZone: "America/Sao_Paulo"});

const serializTransactions = async (transactions: Transactions[], id: number) => {
  const userService = new UserService();


  return await Promise.all(transactions.map(async (transaction) => {
    if (transaction.debitedAccountId !== id) {
      const debitedName = await userService.getUserById(transaction.debitedAccountId);

      return {
        name: debitedName?.username,
        value: transaction.value,
        type: 'cash-out',
        data: getData(transaction.createdAt),
        hour: getHours(transaction.createdAt),
      }
    } else {
      const creditedName = await userService.getUserById(transaction.creditedAccountId);

      return {
        name: creditedName?.username,
        value: transaction.value,
        type: 'cash-in',
        data: getData(transaction.createdAt),
        hour: getHours(transaction.createdAt),
      }
    }
  }));
}

export default serializTransactions;