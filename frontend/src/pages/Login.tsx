import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../components/FormLogin";
import { loginRequest, setToken } from "../services/requests";
import mainImage from '../svg/transfer_money.svg';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    if (err.response && err.response.status === 400) {
      setError("Usuário ou senha inválidos");
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
    
    const response = await loginRequest(username, password);

    if (response instanceof AxiosError) {
      handleError(response);
      return;
    } else {
      navigate("/panel");
      setToken(response.data.token, response.data.username);
    }
  };

  const handleRegister = () => navigate("/register");

  return (
    <section
      className="h-screen flex justify-around items-center
      bg-zinc-800 z-1"
    >
      <img src={mainImage} alt="Transfer money" className="h-[35rem] z-10" />
      <FormLogin
        title="Fazer login"
        mainButton="Login"
        secondaryButton="Crie uma conta"
        username={username}
        password={password}
        error={error}
        handleUser={handleUser}
        handlePass={handlePass}
        handleMainBtn={handleLogin}
        handleSecondaryBtn={handleRegister}
      />
    </section>
  );
}

export default Login;