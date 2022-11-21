import { AxiosError } from "axios";
import React, { FormEvent, useContext, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Context, { ContextInterface } from "../context/Context";
import IAxiosError from "../interfaces/ResponseDataError";
import { accountRequest, createTransaction, transactionsRequest } from "../services/requests";
import dotsLoad from "../svg/3_dots_load.svg";

enum messageTypes {
  ERROR = "text-red-800",
  SUCCESS = "text-green-800",
  NULL = "text-transparent",
}

function SendMoney() {
  const { setUserBalance, setTransactions } = useContext(Context) as ContextInterface;
  const [userToSend, setUserToSend] = useState("");
  const [moneyToSend, setMoneyToSend] = useState<string | undefined>("0");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: messageTypes.NULL,
    data: "",
  });

  const convertMoney = (money: string) => Number(money.replace(',', '.'));

  const validateMoney = (money: string | undefined) => {
    if (money !== undefined) {
      const moneyNumber = convertMoney(money);

      if (moneyNumber > 0) {
        return true;
      } else {
        setMessage({
          type: messageTypes.ERROR,
          data: "Valor deve ser maior que zero" 
        });

        return false;
      }
    }

    setMessage({
      type: messageTypes.ERROR,
      data: "Campo valor é obrigatório" 
    });

    return false;
  };

  const validateUser = (user: string) => {
    if (!user) {
      setMessage({
        type: messageTypes.ERROR,
        data: "Campo usuário é obrigatório" 
      });

      return false;
    }

    return true;
  };

  const handleUserToSend = (e: string) => {
    setUserToSend(e);
    setMessage({
      type: messageTypes.NULL,
      data: "",
    });
  }

  const handleMoneyToSend = (e: string | undefined) => {
    setMoneyToSend(e);
    setMessage({
      type: messageTypes.NULL,
      data: "",
    });
  }

  const handleError = (err: AxiosError) => {    
    if (err.response) {
      const { response: { data: { code }, status } } = err as IAxiosError;

      switch (true) {
        case status === 404 && code === "user_not_found":
          setMessage({
            type: messageTypes.ERROR,
            data: "Usuário não encontrado"
          });
          break;
        case status === 400 && code === "insufficient_funds":
          setMessage({
            type: messageTypes.ERROR,
            data: "Saldo insuficiente"
          });
          break;
        case status === 400 && code === "invalid_transaction":
          setMessage({
            type: messageTypes.ERROR,
            data: "Você não pode transferir para você mesmo"
          });
          break;
        default:
          setMessage({
            type: messageTypes.ERROR,
            data: "Erro ao fazer a transação"
          });
      }
    } else {
      setMessage({
        type: messageTypes.ERROR,
        data: "Erro ao fazer a transação"
      });
    }
  };

  const updateMoneyAndTransactions = async () => {
    const account = await accountRequest();

    const transactions = await transactionsRequest();

    setUserBalance(account.data.balance);
    setTransactions(transactions.data);    
  }

  const handleSend = async (e: FormEvent, money: string | undefined, user: string) => {
    e.preventDefault();

    const checkMoney = validateMoney(money);
    const checkUser = validateUser(user);

    if (!checkMoney || !checkUser) {
      return;
    }

    if (money !== undefined) {
      const moneyNumber = convertMoney(money);

      setLoading(true);
      const response = await createTransaction(user, moneyNumber);
      setLoading(false);
      
      if (response instanceof AxiosError) {
        
        handleError(response);
        return;
      }
      
      setUserToSend("");
      setMoneyToSend("0");
      setMessage({
        type: messageTypes.SUCCESS,
        data: "Transação realizada com sucesso"
      });

      updateMoneyAndTransactions();

      setTimeout(() => { 
        setMessage({
          type: messageTypes.NULL,
          data: ""
        });
      }, 5000);
    }    
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="self-start text-md mb-5 font-semibold uppercase">
        Enviar dinheiro
      </h1>
      <form className="flex mb-3">
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          className="appearance-none bg-transparent border-b-2
          border-neutral-300 outline-none text-zinc-700 mr-3 py-3 px-2
          leading-tight focus:border-neutral-900 transition-all 
          ease-in duration-300"
          value={userToSend}
          onChange={ (e) => handleUserToSend(e.target.value) }
        />
        <CurrencyInput
          id="input-example"
          prefix="R$ "
          defaultValue={0}
          decimalsLimit={2}
          groupSeparator="."
          decimalSeparator=","
          value={moneyToSend}
          allowNegativeValue={false}
          onValueChange={(value) => handleMoneyToSend(value)}
          className="appearance-none bg-transparent border-b-2
          border-neutral-300 outline-none w-[5rem] text-zinc-700 mr-3 py-3 px-2
          leading-tight focus:border-neutral-900 transition-all 
          ease-in duration-300"
        />
        <button
          type="submit"
          className="w-20 h-[2.5rem] bg-black text-white rounded-md
          uppercase hover:bg-zinc-800 flex justify-center items-center cursor-pointer"
          onClick={ (e) => handleSend(e, moneyToSend, userToSend) }
          disabled={loading}
        >
          { loading ? (
              <img src={ dotsLoad } alt="Loading" className="h-5" />
            ) : (
              "Enviar"
            )
          }
        </button>
      </form>
      <p
        className={`
          h-[1.5rem] w-auto text-center mb-3
          ${ message.type }
          transition-all ease-in duration-200`}
      >
        { message.data }
      </p>
    </div>
  );
}

export default SendMoney;