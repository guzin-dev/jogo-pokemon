import React, { useEffect, useState } from "react";
import arrow from "../img/arrow.png";
import sword from "../img/sword.png";
import shield from "../img/shield.png";

function NewGame() {
  const [idPokemon, setIdPokemon] = useState(1);
  const [pokemonSelected, setPokemonSelected] = useState();

  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  });

  const [pokemonI, setPokemonI] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
  });

  function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ocorreu algum erro na pesquisa, tente novamente!`);
        }
        return response.json();
      })
      .then((data) => {
        setPokemon({
          name: data.name,
          image: data.sprites.front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          specialAttack: data.stats[3].base_stat,
          specialDefense: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function fetchPokemonInimgo() {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 905)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ocorreu algum erro na pesquisa, tente novamente!`);
        }
        return response.json();
      })
      .then((data) => {
        setPokemonI({
          name: data.name,
          image: data.sprites.front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function atacarInimigo() {
    let dano = Math.floor(Math.random() * pokemon.attack);
    setPokemonI({ ...pokemonI, hp: pokemonI.hp - dano });
    if (dano > pokemon.attack / 1.25) {
      alert(`Dano: ${dano}, critico!`);
    } else {
      alert(`Dano: ${dano}`);
    }
    if (pokemonI.hp - dano <= 0) {
      setPokemon({ ...pokemon, hp: 0 });
      window.location.href="/win"
    }
  }

  function defenderInimigo() {
    let vida = Math.floor(Math.random() * pokemonI.defense);
    setPokemonI({ ...pokemonI, hp: pokemonI.hp + vida });
  }

  function atacar() {
    let dano = Math.floor(Math.random() * pokemonI.attack);
    setPokemon({ ...pokemon, hp: pokemon.hp - dano });
    if (dano > pokemonI.attack / 1.25) {
      alert(`Dano: ${dano}, critico!`);
    } else {
      alert(`Dano: ${dano}`);
    }
    if (pokemon.hp - dano <= 0) {
      setPokemon({ ...pokemon, hp: 0 });
      window.location.href="/loss"
    }
  }

  function defender() {
    let vida = Math.floor(Math.random() * pokemon.defense);
    setPokemon({ ...pokemon, hp: pokemon.hp + vida });
  }

  useEffect(() => {
    fetchPokemon();
    fetchPokemonInimgo();
  }, [idPokemon]);

  if (pokemonSelected == null)
    return (
      <div className="h-screen w-screen flex justify-center items-center flex-col bg-cover bg-[url('/src/img/background.jpg')]">
        <div className="h-fit w-fit p-12 flex items-center flex-col border rounded-md text-white gap-4">
          <div className="flex items-center flex-col">
            <img src={pokemon.image} className="w-44 h-44"></img>
            <p className="font-bold text-2xl">{pokemon.name}</p>
          </div>
          <div className="flex gap-4">
            <div>
              <p>Hp: {pokemon.hp}</p>
              <p>Attack: {pokemon.attack}</p>
              <p>Defense: {pokemon.defense}</p>
            </div>
            <div>
              <p>Ataque especial: {pokemon.specialAttack}</p>
              <p>Defesa especial: {pokemon.specialDefense}</p>
              <p>Velocidade: {pokemon.speed}</p>
            </div>
          </div>
        </div>

        <div className="gap-4 flex md:flex-col mt-4 md:gap-2 outline-none">
          <button
            onClick={() =>
              idPokemon > 1
                ? setIdPokemon(idPokemon - 1)
                : setIdPokemon(idPokemon)
            }
            className="border w-fit h-fit font-bold text-white hover:bg-white hover:text-black transition-all md:p-4 md:w-32"
          >
            <img src={arrow} className="w-14 md:hidden hover:invert"></img>
            <p className="hidden md:block">ANTERIOR</p>
          </button>
          <button
            onClick={() => setPokemonSelected(idPokemon)}
            className="border p-4 font-bold text-white hover:bg-white hover:text-black transition-all md:w-32"
          >
            SELECIONAR
          </button>
          <button
            onClick={() =>
              idPokemon < 905
                ? setIdPokemon(idPokemon + 1)
                : setIdPokemon(idPokemon)
            }
            className="border w-fit h-fit font-bold text-white hover:bg-white hover:text-black hover:inv transition-all md:p-4 md:w-32"
          >
            <img
              src={arrow}
              className="rotate-180 w-14 md:hidden hover:invert"
            ></img>
            <p className="hidden md:block">PRÓXIMO</p>
          </button>
        </div>
      </div>
    );
  else {
    return (
      <div className="h-screen w-screen flex bg-cover bg-[url('/src/img/background.jpg')]">
        <div className="flex items-end w-3/6 h-4/5">
          <img src={pokemon.image} className="w-64"></img>
        </div>
        <div className="flex items-end justify-end w-3/6 h-4/5">
          <img src={pokemonI.image} className="w-64"></img>
        </div>
        <div className="absolute flex bottom-0 w-screen h-1/5 bg-black bg-opacity-40 border">
          <div className="w-2/4 h-full border-r-2 flex">
            <div className="w-2/4 h-full flex justify-center items-center flex-col">
              <button
                onClick={() => atacarInimigo()}
                className="border flex justify-center items-center w-4/5 font-bold text-white hover:bg-white hover:text-black transition-all p-4"
              >
                <p className="md:hidden">ATACAR</p>
                <img
                  src={sword}
                  className="hidden w-8 hover:invert md:block sm:w-4"
                ></img>
              </button>
              <button
                onClick={() => defender()}
                className="border flex justify-center items-center w-4/5 font-bold text-white hover:bg-white hover:text-black transition-all p-4"
              >
                <p className="md:hidden">DEFENDER</p>
                <img
                  src={shield}
                  className="hidden w-8 hover:invert md:block sm:w-4"
                ></img>
              </button>
            </div>
            <div className="w-2/4 h-full flex justify-center items-center flex-col">
              <div className="flex gap-4">
                <div className="text-white text-2xl md:text-xl sm:text-sm">
                  <p>
                    <b>Hp:</b> {pokemon.hp}
                  </p>
                  <p>
                    <b>Attack:</b> {pokemon.attack}
                  </p>
                  <p>
                    <b>Defense:</b> {pokemon.defense}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/4 h-full flex">
            <div className="w-2/4 h-full flex justify-center items-center flex-col">
              <div className="flex gap-4">
                <div className="text-white text-2xl text-right md:text-xl sm:text-sm">
                  <p>
                    <b>Hp:</b> {pokemonI.hp}
                  </p>
                  <p>
                    <b>Attack:</b> {pokemonI.attack}
                  </p>
                  <p>
                    <b>Defense:</b> {pokemonI.defense}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-2/4 h-full flex justify-center items-center flex-col">
              <button
                onClick={() => atacar()}
                className="border flex justify-center items-center w-4/5 font-bold text-white hover:bg-white hover:text-black transition-all p-4"
              >
                <p className="md:hidden">ATACAR</p>
                <img
                  src={sword}
                  className="hidden w-8 hover:invert md:block sm:w-4"
                ></img>
              </button>
              <button
                onClick={() => defenderInimigo()}
                className="border flex justify-center items-center w-4/5 font-bold text-white hover:bg-white hover:text-black transition-all p-4"
              >
                <p className="md:hidden">DEFENDER</p>
                <img
                  src={shield}
                  className="hidden w-8 hover:invert md:block sm:w-4"
                ></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewGame;
