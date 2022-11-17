import React from "react";

interface FormLoginProps {
  mainButton: string;
  secondaryButton: string;
  title: string;
  username: string;
  password: string;
  error: string;
  handleUser: (e: React.FormEvent<HTMLInputElement>) => void;
  handlePass: (e: React.FormEvent<HTMLInputElement>) => void;
  handleMainBtn: (e: React.FormEvent<HTMLButtonElement>) => void;
  handleSecondaryBtn: () => void;
}

function FormLogin({
  mainButton,
  secondaryButton,
  title,
  username,
  password,
  error,
  handleUser,
  handlePass,
  handleMainBtn,
  handleSecondaryBtn,
}: FormLoginProps ) {
  return (
  <form
      className="w-96 h-96 flex flex-col items-center
      justify-around bg-white rounded-xl py-3"
    >
      <h1 className="uppercase font-bold">
        {title}
      </h1>
      <input
        type="text"
        name="username"
        id="username"
        value={ username }
        placeholder="Usuário"
        onChange={ (e) => handleUser(e) }
        className="appearance-none bg-transparent border-b-2
        border-gray-300 outline-none w-4/5 text-zinc-700 mr-3 py-3 px-2
        leading-tight focus:border-zinc-900 transition-all 
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
        border-gray-300 outline-none w-4/5 text-zinc-700 mr-3 py-3 px-2
        leading-tight focus:border-zinc-900 transition-all 
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
        onClick={ (e) => handleMainBtn(e) }
        className="w-4/5 bg-black text-white p-2
        rounded-md uppercase hover:bg-zinc-800"
        >
        { mainButton }
      </button>
      <span
        onClick={ handleSecondaryBtn }
        className="w-4/5 text-zinc-500 font-semibold
        text-center hover:cursor-pointer hover:text-zinc-900"
        >
        { secondaryButton }
      </span>
    </form>
  );
}

export default FormLogin;