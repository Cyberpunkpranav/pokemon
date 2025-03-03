import Image from "next/image";
import PokemonList from "./components/lists/pokemonList";
import { Suspense } from "react";

export default async function Home() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_POKE_API}`,{'method':'GET'})
    const data = await response.json()
    const alldetails = await data.results.map(async(Data)=>{
      const res = await fetch(`${Data.url}`,{'method':'GET'});
      return res.json()
    })
   const AllData  = Promise.all(alldetails).then((results)=>{
        return results
    }).catch((e)=>{
      console.log(e.message,e.statusCode)
    })
    const pokemons = await AllData
    console.log(data)
  return (  
    <section className="container relative h-full mx-auto">
      <input type="text"/>
      <Suspense fallback={<div className="text-white w-full text-center">loading....</div>}>
      <PokemonList count={data.count} data={pokemons}/>
      </Suspense>
    </section>
  );
}
