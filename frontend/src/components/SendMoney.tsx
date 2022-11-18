import { AxiosError } from "axios";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import IAxiosError from "../interfaces/ResponseDataError";
import { createTransaction } from "../services/requests";
import dotsLoad from "../svg/3_dots_load.svg";

enum messageTypes {
  ERROR = "text-red-800",
  SUCCESS = "text-green-800",
  NULL = "text-transparent",
}

function SendMoney() {
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

  const handleSend = async (money: string | undefined, user: string) => {
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

      setTimeout(() => { 
        setMessage({
          type: messageTypes.NULL,
          data: ""
        });
      }, 5000);
    }    
  };

  return (
    <div>
      <h1>Enviar dinheiro</h1>
      <div className="flex">
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          className="outline-none border-2 px-2 mr-2 border-neutral-900 rounded-md"
          value={userToSend}
          onChange={ (e) => setUserToSend(e.target.value) }
        />
        <CurrencyInput
          id="input-example"
          prefix="R$ "
          defaultValue={0}
          decimalsLimit={2}
          groupSeparator="."
          decimalSeparator=","
          value={moneyToSend}
          onValueChange={(value) => setMoneyToSend(value)}
          className="outline-none border-2 px-2 mr-2 border-neutral-900 rounded-md"
        />
        <button
          type="button"
          className="w-20 h-[2.5rem] bg-black text-white rounded-md
          uppercase hover:bg-zinc-800 flex justify-center items-center cursor-pointer"
          onClick={ () => handleSend(moneyToSend, userToSend) }
          disabled={loading}
        >
          { loading ? (
              <img src={ dotsLoad } alt="Loading" className="h-5" />
            ) : (
              "Enviar"
            )
          }
        </button>
      </div>
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