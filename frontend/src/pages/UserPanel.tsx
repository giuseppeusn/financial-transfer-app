import { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import SendMoney from "../components/SendMoney";
import TransactionsList from "../components/TransactionsList";
import Context, { ContextInterface } from "../context/Context";
import { accountRequest, setToken, transactionsRequest, validateToken } from "../services/requests";
import currencyFormatter from "../utils/CurrencyFormatter";
import { FaUserCircle } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

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
      navigate("/");
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
            <div className="bg-white h-auto flex flex-col p-5 items-center justify-center rounded-xl">
              <div className="flex flex-col items-center w-full mb-8">
                <div className="flex justify-around w-full">
                  <FaUserCircle className="text-[10rem]" />
                  <div className="flex flex-col justify-around items-center">
                    <h1 className="text-xl">Olá, @{ username }!</h1>
                    <h1 className="font-semibold">Saldo: { currencyFormatter(userBalance) }</h1>
                    <button
                      type="button"
                      className="bg-black w-[5rem] text-white py-1 px-3 rounded-md uppercase
                      hover:bg-zinc-800 flex justify-around items-center"
                      onClick={ logout }
                      >
                      <BiLogOut className="mr-2" />
                      Sair
                    </button>
                  </div>
                </div>
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