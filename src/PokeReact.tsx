import { useEffect, useState } from "react";
import PinkButton from "./components/PinkButton";
import { Pokemon } from "./interfaces/Pokemon";
import { PokemonList } from "./interfaces/PokemonList";


const PokeReact = () => {
  const [pokemonName1, setPokemonName1] = useState<string>("");
  const [pokemonName2, setPokemonName2] = useState<string>("");
  const [pokemon1Data, setPOkemon1Data] = useState<Pokemon | null>(null);
  const [pokemon2Data, setPOkemon2Data] = useState<Pokemon | null>(null);
  const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);

  const [hasFightResults, setHasFightResults] = useState<boolean>(false);
  const [pkmn1Hp, setPkmn1Hp] = useState(0);
  const [pkmn2Hp, setPkmn2Hp] = useState(0);

  useEffect(()=> {
    listPokemon();
  }, [])

  const listPokemon = async () => {
    const fetchJson = await fetch("http://localhost:3000/api/pokemon/list");
    const listData = await fetchJson.json();
    setPokemonList(listData);
  }

  const selectPokemon = async () => {
    const fetchJson = await fetch(`http://localhost:3000/api/pokemon/get?name=${pokemonName1}`);
    const pokemonData = await fetchJson.json();
    setPOkemon1Data(pokemonData);
  }
  const selectPokemon2 = async () => {
    const fetchJson = await fetch(`http://localhost:3000/api/pokemon/get?name=${pokemonName2}`);
    const pokemonData = await fetchJson.json();
    setPOkemon2Data(pokemonData);
  }
  const fight = ()=> {
    const pkmn1Hp = 
      (pokemon1Data?.stats.find((s)=>s.stat.name==="hp")?.base_stat || 0 ) +
      (pokemon1Data?.stats.find((s)=>s.stat.name==="defense")?.base_stat || 0 ) - 
      (pokemon2Data?.stats.find((s)=>s.stat.name==="attack")?.base_stat || 0);
    setPkmn1Hp(pkmn1Hp);
    const pkmn2Hp = 
      (pokemon2Data?.stats.find((s)=>s.stat.name==="hp")?.base_stat || 0 ) +
      (pokemon2Data?.stats.find((s)=>s.stat.name==="defense")?.base_stat || 0 ) - 
      (pokemon1Data?.stats.find((s)=>s.stat.name==="attack")?.base_stat || 0);
    setPkmn2Hp(pkmn2Hp);
    setHasFightResults(true);
  }
  return (
    <div style={{
      display: "flex"
    }}>
      <div>
        {
          pokemon1Data && 
          <div>
            <img src={pokemon1Data.sprites.front_default}/>
            <p>
              Name: {pokemon1Data?.name} <br/>
              HP: {pokemon1Data.stats.find(e=>e.stat.name==="hp")?.base_stat} <br/>
              Attack: {pokemon1Data.stats.find(e=>e.stat.name==="attack")?.base_stat} <br/>
              DEfense: {pokemon1Data.stats.find(e=>e.stat.name==="defense")?.base_stat} <br/>
            </p>
          </div>
        }
        <input type="" placeholder="Pokemon" value={pokemonName1} onChange={(e)=>setPokemonName1(e.target.value)}/>
        <PinkButton  buttonClick={selectPokemon} label="Select Pokemon"/>
      </div>
      <div>
        {
          pokemon2Data && 
          <div>
            <img src={pokemon2Data.sprites.front_default}/>
            <p>
              Name: {pokemon2Data?.name} <br/>
              HP: {pokemon2Data.stats.find(e=>e.stat.name==="hp")?.base_stat} <br/>
              Attack: {pokemon2Data.stats.find(e=>e.stat.name==="attack")?.base_stat} <br/>
              DEfense: {pokemon2Data.stats.find(e=>e.stat.name==="defense")?.base_stat} <br/>
            </p>
          </div>
        }
        <input type="" placeholder="Pokemon" value={pokemonName2} onChange={(e)=>setPokemonName2(e.target.value)}/>
        {
          pokemonList && (
            <>
              <select
                onChange={(e)=>setPokemonName2(e.target.value)}
              >
                {
                  pokemonList.results.map((pokemon)=>{
                    return <option value={pokemon.name}>
                      {pokemon.name}
                    </option>
                  })
                }
              </select>
            </>
          )
        }
        <PinkButton  buttonClick={selectPokemon2} label="Select Pokemon"/>

      </div>
      <PinkButton buttonClick={fight} label={"Payt!"} />
      {hasFightResults && (
        <div>
          {pokemon1Data?.name}: {pkmn1Hp} vs 
          {pokemon2Data?.name}: {pkmn2Hp}
        </div>
      )}
    </div>
  )
}

export default PokeReact;