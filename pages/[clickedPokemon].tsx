import React from "react";
import Link from "next/link";
import { Button, Card } from "antd";
import classes from "../styles/Home.module.css";

type Data = {
  data: {
    height: number;
    weight: number;
    name: string;
    sprites: {
      front_default: string;
    };
    moves: {
      move: {
        name: string;
      };
    }[];
  };
};

const ClickedPokemon = (props: Data) => {
  const height = props.data.height;
  const weight = props.data.weight;
  const img = props.data.sprites.front_default;
  const name = props.data.name;
  const moves = props.data.moves;

  const movesArr = [];
  for (let i = 0; i < moves.length; i++) {
    movesArr.push(moves[i].move.name);
  }

  return (
    <div className={classes.clickedPokemonContainer}>
      <div className={classes.backButton}>
        <Link href="/allpokemons/00">
          <Button type="primary">Go back!!!</Button>
        </Link>
      </div>
      <div className={classes.card}>
        <Card
          hoverable
          style={{ width: 340 }}
          cover={<img alt="example" src={img} />}
        >
          <ul className={classes.pokemonInfoUl}>
            <li className={classes.Pokename}>{name.toUpperCase()}</li>
            <li>Height: {height} cm</li>
            <li>Weight: {weight} gr</li>
            <br />
            <li>Moves:</li>
            {movesArr.length
              ? movesArr.map((item) => (
                  <li key={item} className={classes.movesLi}>
                    {item}
                  </li>
                ))
              : "No moves to be shown"}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ClickedPokemon;

//FIX THIS

type Context = {
  query: {
    clickedPokemon: string;
  };
};

export const getServerSideProps = async (context: Context) => {
  //FIX THIS
  const clickedPokeName = context.query.clickedPokemon;
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1118");
  const fetchedData = await response.json();
  const currentPokemon = fetchedData.results.find(
    (pokemon: { name: string }) => pokemon.name === clickedPokeName
  );
  const currentPokemonData = currentPokemon.url;
  const response1 = await fetch(`${currentPokemonData}`);
  const fetchedData1 = await response1.json();
  return {
    props: { data: fetchedData1 },
  };
};
