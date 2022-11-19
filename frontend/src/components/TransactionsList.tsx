import React, { useEffect, useState } from "react";
import Transaction from "../interfaces/Transaction";
import currencyFormatter from "../utils/CurrencyFormatter";

interface TransactionsListProps {
  transactions: Transaction[];
}

function TransactionsList({ transactions }: TransactionsListProps) {
  const [dateFilter, setDateFilter] = useState("");
  const [moneyType, setMoneyType] = useState("all");
  const [transactionsArray, setTransactionsArray] = useState<Transaction[]>([]);

  const selectDate = (e: string) => {    
    if (e) {
      const date = new Date(e.replace("-", "/"))
        .toLocaleDateString("pt-BR", {timeZone: "America/Sao_Paulo"});
        
      setDateFilter(date);
    } else {
      setDateFilter("");
    }
  };

  const filterByDate = () => {
    const filtered = transactions.filter((transaction) => transaction.date === dateFilter);

    setTransactionsArray(filtered);
  }

  const filterByMoneyType = () => {
    const filtered = transactions.filter((transaction) => transaction.type === moneyType);

    setTransactionsArray(filtered);
  }

  const filterByDateAndMoneyType = () => {
    console.log(moneyType);
    
    const filtered = transactions.filter((transaction) => {
      return transaction.date === dateFilter && transaction.type === moneyType;
    });

    setTransactionsArray(filtered);
  }

  const filterTransactions = () => {
    switch (true) {
      case dateFilter.length > 0 && moneyType !== "all":
        filterByDateAndMoneyType();
        break;
      case dateFilter.length > 0:
        filterByDate();
        break;
      case moneyType !== "all":
        filterByMoneyType();
        break;
    }
  };

  useEffect(() => {
    setTransactionsArray(transactions);
  }, [transactions]);

  return (
    <>
      <div className="flex flex-col">
        <div>
          <label>Data da transação</label>
          <input type="date" onChange={(e) => selectDate(e.target.value)} />
        </div>
        <div>
          <label>Tipo de transação</label>
          <select onChange={ (e) => setMoneyType(e.target.value) }>
            <option value="all">Todos</option>
            <option value="cash-in">Recebimentos</option>
            <option value="cash-out">Envios</option>
          </select>
        </div>
      </div>
      <button onClick={ filterTransactions }>filter</button>
      <div className="flex flex-col items-center">
        {
          transactionsArray.length ? (
            transactionsArray.map((transaction: Transaction) => {
              const { id, value, name, type, date, hour } = transaction;
              const transBalance = currencyFormatter(value);

              return (
                <div key={ id } className="flex flex-col items-center">
                  {
                    type === "cash-in" ? (
                      <span>
                        <b>@{ name }</b> enviou { transBalance } para você
                      </span>
                    ) : (
                      <span>
                        <b>Você</b> enviou { transBalance } para <b>@{ name }</b>
                      </span>
                    )
                  }
                  <span
                    className={type === "cash-in" ? "text-green-700" : "text-red-700"}
                  >
                    <span className="mr-1">
                      { type === "cash-in" ? "+" : "-" }
                    </span>
                    { transBalance }
                  </span>
                  <div className="w-auto flex justify-around">
                    <span>{ date }</span>
                    <span>{ hour }</span>
                  </div>
                </div>
              );
            })
          ) : (
            <span>
              Nenhuma transação encontrada
            </span>
          )
        }
      </div>
    </>
  );
}

export default TransactionsList;