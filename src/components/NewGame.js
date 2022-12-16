import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/pokemon.svg";

function NewGame() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col bg-cover bg-[url('/src/img/background.jpg')]">
      <img src={logo} className="w-1/4 md:w-1/2"></img>
      <Link to={"/battle"} className="w-fit h-fit border mt-4 p-4 font-bold text-white hover:bg-white hover:text-black transition-all">
        <button>NOVO JOGO</button>
      </Link>
    </div>
  );
}

export default NewGame;
