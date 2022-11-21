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
      default:
        setTransactionsArray(transactions);
        break;
    }
  };

  useEffect(() => {
    setTransactionsArray(transactions);
  }, [transactions]);

  return (
    <div
      className="flex flex-col items-center h-[90vh] bg-white rounded-xl py-2 px-4 border-8 border-white"
    >
      <h1 className="self-start text-xl mb-5 font-semibold uppercase">Histórico de transações</h1>
      <div className="flex w-full justify-around mb-5 items-center">
        <div className="flex flex-col items-center">
          <label>Data da transação</label>
          <input
            type="date"
            onChange={(e) => selectDate(e.target.value)}
            className="bg-transparent border-b-2
            border-neutral-300 outline-none text-zinc-700 mr-3 py-3 px-2
            leading-tight focus:border-neutral-900 transition-all 
            ease-in duration-300"
          />
        </div>
        <div className="flex flex-col items-center">
          <label>Tipo de transação</label>
          <select
            onChange={ (e) => setMoneyType(e.target.value) }
            className="bg-transparent border-b-2
            border-neutral-300 outline-none text-zinc-700 mr-3 py-3 px-2
            leading-tight focus:border-neutral-900 transition-all 
            ease-in duration-300 text-center"
          >
            <option value="all">Todos</option>
            <option value="cash-in">Recebimentos</option>
            <option value="cash-out">Envios</option>
          </select>
        </div>
        <button
          onClick={ filterTransactions }
          className="w-20 h-[2.5rem] bg-black text-white rounded-md
          uppercase hover:bg-zinc-800 flex justify-center items-center cursor-pointer"
        >
          Filtrar
        </button>
      </div>
      <div
        className="overflow-auto h-auto w-[30rem] scrollbar-thin scrollbar-thumb-neutral-400
        scrollbar-thumb-rounded"
      >
        {
          transactionsArray.length ? (
            transactionsArray.map((transaction: Transaction) => {
              const { id, value, name, type, date, hour } = transaction;
              const transBalance = currencyFormatter(value);

              return (
                <div key={ id } className="flex items-center justify-around
                w-full border-b-[1px] border-gray-200 p-3">
                  <div className="flex flex-col">
                    <div className="mb-2">
                      {
                        type === "cash-in" ? (
                          <>
                            <b>@{ name }</b> enviou { transBalance } para você
                          </>
                        ) : (
                          <>
                            <b>Você</b> enviou { transBalance } para <b>@{ name }</b>
                          </>
                        )
                      }
                    </div>
                    <div className="flex justify-around text-neutral-500">
                      <span>{ date }</span>
                      <span>{ hour }</span>
                    </div>
                  </div>
                  <span
                    className={type === "cash-in" ? "text-green-700" : "text-red-700"}
                  >
                    <span className="mr-1">
                      { type === "cash-in" ? "+" : "-" }
                    </span>
                    { transBalance }
                  </span>
                </div>
              );
            })
          ) : (
            <span className="flex justify-center">
              Nenhuma transação encontrada
            </span>
          )
        }
      </div>
    </div>
  );
}

export default TransactionsList;