import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../components/FormLogin";
import IAxiosError from "../interfaces/ResponseDataError";
import { registerRequest, setToken } from "../services/requests";
import mobilePay from "../svg/mobile_pay.svg";

function Register() {
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

  const validateUsername = () => {
    if (!username) {
      setError("Campo usuário é obrigatório");
      return false;
    }

    if (username.length < 3) {
      setError("Usuário deve ter no mínimo 3 caracteres");
      return false;
    }

    return true;
  };

  const validatePassword = () => {
    const regexUpperNumber = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    switch(true) {
      case !password:
        setError("Campo senha é obrigatório");
        return false;
      case password.length < 8:
        setError("Senha deve ter no mínimo 8 caracteres");
        return false;
      case !password.match(regexUpperNumber):
        setError("Senha deve ter pelo menos uma letra maiúscula e um número");
        return false;
    }

    return true;
  };  

  const handleError = (err: AxiosError) => {
    if (err.response) {
      const { response: { data: { code }, status } } = err as IAxiosError;

      if (status === 409 && code === "user_exist") {
        setError("Nome de usuário já cadastrado");
      }
    } else {
      setError("Erro ao fazer login");
    }
  };

  const handleRegister = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const checkUsername = validateUsername();
    const checkPassword = validatePassword();

    if (!checkUsername && !checkPassword) {
      return;
    }

    const response = await registerRequest(username, password);

    if (response instanceof AxiosError) {
      handleError(response);
      return;
    }

    setToken(response.data.token, response.data.username);
    navigate("/panel");
  }

  const handleLogin = () => navigate("/");

  return (
    <section
      className="h-screen flex justify-around items-center
      bg-zinc-800 select-none"
    >
      <img src={mobilePay} alt="Transfer money" className="h-[35rem]" />
      <FormLogin
        title="Criar conta"
        mainButton="Criar conta"
        secondaryButton="Já tenho uma conta"
        username={username}
        password={password}
        error={error}
        handleUser={handleUser}
        handlePass={handlePass}
        handleMainBtn={handleRegister}
        handleSecondaryBtn={handleLogin}
      />
    </section>
  );
}

export default Register;