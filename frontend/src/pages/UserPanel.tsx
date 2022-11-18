import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import IAxiosError from "../interfaces/ResponseDataError";
import Transaction from "../interfaces/Transaction";
import { accountRequest, setToken, transactionsRequest, validateToken } from "../services/requests";
import currencyFormatter from "../utils/CurrencyFormatter";

function UserPanel() {
  const [userBalance, setUserBalance] = useState("0");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleError = (err: AxiosError) => {
    if (err.response) {
      const { response: { data: { code }, status } } = err as IAxiosError;

      if (status !== 204 && code === "jwt_error") {
        navigate("/");
      }
    }
  };

  const fetchTransactions = async () => {
    const response = await transactionsRequest();

    setLoading(false);
    setTransactions(response.data);
  }

  const fetchAccount = async () => {
    const response = await accountRequest();
    
    fetchTransactions();    
    setUserBalance(response.data.balance);
  }

  const fetchToken = async (token: string, username: string) => {
    setLoading(true);
    const response = await validateToken(token);

    if (response instanceof AxiosError) {
      setLoading(false);
      handleError(response);
      return;
    }

    setToken(token, username);

    fetchAccount();
  };

  useEffect(() => {
    const { username, token } = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token) {
      navigate("/");
    } else {
      fetchToken(token, username);
    }
  }, []);

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          <div className="w-[20rem]">
            <h1>{ currencyFormatter(userBalance) }</h1>
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
          </div>
        )
      }
    </>
  );
}

export default UserPanel;