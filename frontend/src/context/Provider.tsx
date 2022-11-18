import React, { ReactNode, useState } from 'react';
import Context, { ContextInterface } from './Context';
import Transaction from '../interfaces/Transaction';

interface Props {
  children: ReactNode;
}

function Provider({ children }: Props) {
  const [userBalance, setUserBalance] = useState("0");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const value: ContextInterface = {
    userBalance,
    setUserBalance,
    transactions,
    setTransactions,
  };

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

export default Provider;
