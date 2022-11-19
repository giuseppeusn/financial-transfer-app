import { createContext, Dispatch } from 'react';
import Transaction from '../interfaces/Transaction';

export interface ContextInterface {
  userBalance: string;
  setUserBalance: Dispatch<string>;
  transactions: Transaction[];
  setTransactions: Dispatch<Transaction[]>;
}

const Context = createContext<ContextInterface | null>(null);

export default Context;
