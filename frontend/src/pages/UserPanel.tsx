import { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import SendMoney from "../components/SendMoney";
import TransactionsList from "../components/TransactionsList";
import Context, { ContextInterface } from "../context/Context";
import IAxiosError from "../interfaces/ResponseDataError";
import { accountRequest, setToken, transactionsRequest, validateToken } from "../services/requests";
import currencyFormatter from "../utils/CurrencyFormatter";

function UserPanel() {
  const {
    userBalance,
    setUserBalance,
    transactions,
    setTransactions
  } = useContext(Context) as ContextInterface;

  const [username, setUsername] = useState("");
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

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const { username, token } = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (!token) {
      navigate("/");
    } else {
      setUsername(username);
      fetchToken(token, username);
    }
  }, []);

  return (
    <>
      {
        loading ? (
          <Loading />
        ) : (
          <div className="bg-zinc-800 flex h-screen justify-around items-center">
            <div className="bg-white w-[35rem] h-[15rem] flex flex-col items-center justify-center rounded-xl">
              <div className="flex flex-col items-center">
                <h1>Olá, @{ username }!</h1>
                <h1>Saldo: { currencyFormatter(userBalance) }</h1>
                <button
                  type="button"
                  className="bg-black w-[5rem] text-white py-1 px-3 rounded-md uppercase
                  hover:bg-zinc-800 flex justify-center items-center"
                  onClick={ logout }
                >
                  Sair
                </button>
              </div>
              <SendMoney />
            </div>
            <TransactionsList transactions={ transactions } />
          </div>
        )
      }
    </>
  );
}

export default UserPanel;