import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/pokemon.svg";

function Loss() {
  return (
    <div className="h-screen w-screen flex justify-center items-center gap-5 flex-col bg-cover bg-[url('/src/img/background.jpg')]">
      <h1 className="text-4xl text-white">Você perdeu :(</h1>
      <Link to={"/battle"} className="w-fit h-fit border mt-4 p-4 font-bold text-white hover:bg-white hover:text-black transition-all">
        <button>NOVO JOGO</button>
      </Link>
    </div>
  );
}

export default Loss;
