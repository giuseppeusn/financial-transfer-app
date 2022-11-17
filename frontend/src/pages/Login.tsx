import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest, setToken } from "../services/requests";

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

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }
    
    const response = await loginRequest(username, password);

    if (response) {
      if (response.status === 200) {
        navigate("/panel");
        setToken(response.data.token, response.data.username);
      } else {
        setError("Usuário ou senha incorretos");
      }
    } else {
      console.log("Internal error");
    }
  };

  return (
    <section
      className="h-screen flex justify-center items-center
      bg-gradient-to-r from-[#414141] to-[#000000]"
    >
      <form
        className="w-96 h-96 flex flex-col items-center
        justify-around bg-white rounded-xl py-3"
      >
        <h1 className="uppercase font-bold">Banco de transferências</h1>
        <input
          type="text"
          name="username"
          id="username"
          value={ username }
          placeholder="Usuário"
          onChange={ (e) => handleUser(e) }
          className="appearance-none bg-transparent border-b-2
          border-gray-300 outline-none w-4/5 text-stone-700 mr-3 py-3 px-2
          leading-tight focus:border-stone-900 transition-all 
          ease-in duration-300"
        />
        <input
          type="password"
          name="password"
          id="password"
          value={ password }
          placeholder="Senha"
          onChange={ (e) => handlePass(e) }
          className="appearance-none bg-transparent border-b-2
          border-gray-300 outline-none w-4/5 text-stone-700 mr-3 py-3 px-2
          leading-tight focus:border-stone-900 transition-all 
          ease-in duration-300"
        />
        <p
          className={`
            h-[1.5rem]
            ${error ? "text-red-800" : "text-transparent" }
            transition-all ease-in duration-200`}
        >
          { error }
        </p>
        <button
          type="submit"
          onClick={ (e) => handleSubmit(e) }
          className="w-3/5 bg-black text-white p-2
          rounded-md uppercase hover:bg-stone-800"
          >
          Login
        </button>
        <span
          // onClick={ (e) => handleSubmit(e) }
          className="w-4/5 text-stone-500 font-semibold
          text-center hover:cursor-pointer hover:text-stone-900"
          >
          Crie uma conta
        </span>
      </form>
    </section>
  );
}

export default Login;