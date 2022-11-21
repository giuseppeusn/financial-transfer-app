import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../components/FormLogin";
import IAxiosError from "../interfaces/ResponseDataError";
import { loginRequest, setToken } from "../services/requests";
import mainImage from '../svg/transfer_money.svg';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUser = (e: FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
    setError("");
  };

  const handlePass = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    setError("");
  };

  const handleError = (err: AxiosError) => {       
    if (err.response) {
      const { response: { data: { code }, status } } = err as IAxiosError;      

      if (status === 401 && code === "invalid_credentials") {
        setError("Usuário ou senha inválidos");
      } else {
        setError("Erro ao fazer login");
      }
    } else {      
      setError("Erro ao fazer login");
    }
  };

  const handleLogin = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(!username || !password) {
      setError("Preencha todos os campos");
      return;
    }
    
    setLoading(true);
    const response = await loginRequest(username, password);
    setLoading(false);    

    if (response instanceof AxiosError) {
      handleError(response);
      return;
    }

    setToken(response.data.token, response.data.username);
    navigate("/panel");
  };

  const handleRegister = () => navigate("/register");

  return (
    <section
      className="h-screen flex justify-around items-center
      bg-zinc-800 select-none"
    >
      <img src={mainImage} alt="Transfer money" className="h-[35rem]" />
      <FormLogin
        title="Faça login"
        mainButton="Entrar"
        secondaryButton="Crie uma conta"
        username={username}
        password={password}
        error={error}
        handleUser={handleUser}
        handlePass={handlePass}
        handleMainBtn={handleLogin}
        handleSecondaryBtn={handleRegister}
        loading={loading}
      />
    </section>
  );
}

export default Login;