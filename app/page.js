import PokemonList from "./pokemon/pokemonList";
import { Suspense } from "react";
import Pagination from "./components/pagination";
  
async function getPokemonData(offset) {
  const api = `${process.env.NEXT_PUBLIC_POKE_API}?offset=${offset}&limit=${20}`;
  const response = await fetch(api)
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export default async function Home({searchParams}) {
  const params = await searchParams
  const offset = params.offset || 0

    const data = await getPokemonData(offset)
    const alldetails = await data.results.map(async(Data)=>{
      const res = await fetch(`${Data.url}`,{ 
        cache: 'force-cache', 
        next: { revalidate: 3600 } 
        });
   
      return res.json()
    })

   const AllData  = Promise.all(alldetails).then((results)=>{
        return results
    }).catch((e)=>{
      console.log(e.message)
    })

    const pokemons = await AllData

  return (  
    <section className="container relative h-full mx-auto">
      <input type="text"/>
      <Suspense fallback={<div className="text-white w-full text-center">loading....</div>}>
      <PokemonList data={pokemons}/>
      <Pagination prev={data.previous} next={data.next} count={data.count}/>
      </Suspense>
    </section>
  );
}
