import React from "react";
import Transaction from "../interfaces/Transaction";
import currencyFormatter from "../utils/CurrencyFormatter";

interface TransactionsListProps {
  transactions: Transaction[];
}

function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <>
      {
        transactions.map((transaction: Transaction) => {
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
      }
    </>
  );
}

export default TransactionsList;