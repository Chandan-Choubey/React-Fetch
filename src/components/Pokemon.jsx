import React, { useEffect, useState } from "react";
import "../index.css";
import PokemonCards from "./PokemonCards";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const API = "https://pokeapi.co/api/v2/pokemon?limit=500";
  const fetchPokemon = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        // console.log(curPokemon.url);
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      const detailedResponse = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPokemon();
    // setPokemon(fetchPokemon());
  }, []);

  const searchData = pokemon.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <div>
        <h1>Error: {error}</h1>;
      </div>
    );
  }
  return (
    <>
      <section className="container">
        <header>
          <h1>Let's Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokemon"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            values={search}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((currpokemon) => {
              return <PokemonCards key={currpokemon.id} data={currpokemon} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Pokemon;
