import React from "react";

function NotFound() {
  return (
    <div
      className="h-screen flex flex-col justify-center
      items-center bg-zinc-800"
    >
      <h1 className="text-6xl text-white font-bold">
        Erro 404
      </h1>
      <h2 className="text-4xl text-white font-bold mt-10">
        Página não encontrada!
      </h2>
      <h3
        className="text-cyan-500 font-semibold
        text-center cursor-pointer hover:text-cyan-800 mt-5"
        onClick={ () => window.history.back() }
      >
        Retornar para a página anterior
      </h3>
    </div>
  );
}

export default NotFound;