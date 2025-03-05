import React from 'react'
import PokemonDetails from './pokemon'

export async function generateStaticParams() {
  const api = `https://pokeapi.co/api/v2/pokemon?limit=1`; // Get total count
  const response = await fetch(api, { cache: 'force-cache' });
  const data = await response.json();
  const total = data.count; // Total Pokémon available in API
  const limit = 50; // Set reasonable batch size
  const pages = Math.ceil(total / limit); // Total pages

  let allPokemon = [];

  // Paginate through all Pokémon
  for (let i = 0; i < pages; i++) {
    const offset = i * limit;
    const pageApi = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    try {
      const res = await fetch(pageApi, { cache: 'force-cache' });
      const json = await res.json();

      // Fetch each Pokémon's details to get ID
      const pokemonDetails = await Promise.all(
        json.results.map(async (pokemon) => {
          const detailsRes = await fetch(pokemon.url, { cache: 'force-cache' });
          if (!detailsRes.ok) throw new Error(`Failed to fetch ${pokemon.url}`);
          
          const details = await detailsRes.json();
          return { id: details.id.toString() };
        })
      );

      allPokemon = [...allPokemon, ...pokemonDetails];
    } catch (error) {
      console.error(`Error fetching Pokémon from offset ${offset}:`, error);
    }
  }

  return allPokemon;
}

const page = async({params}) => {
    const {id} = await params
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`,{ 
      cache: 'force-cache', 
      next: { revalidate: 3600 } 
      })
    const data = await response.json()
  return (
    <PokemonDetails data={data}/>
  )
}

export default page