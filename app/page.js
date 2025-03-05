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
  const search = params.search
  let next = ''
  let previous = ''

  const ConditionalData = async () => {
    if (search) {
      try {
        let api = `${process.env.NEXT_PUBLIC_POKE_API}/${search}`;
        const res = await fetch(api);
  
        if (!res.ok) {
          throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }
  
        const data = await res.json(); // Ensure response is valid JSON
        return data;
      } catch (e) {
        return []; // Return empty array instead of raw error message
      }
    } else {
      try {
        const data = await getPokemonData(offset);
        next = data.next;
        previous = data.previous;
  
        const alldetails = data.results.map(async (Data) => {
          const res = await fetch(`${Data.url}`, {
            cache: "force-cache",
            next: { revalidate: 3600 },
          });
  
          if (!res.ok) {
            throw new Error(`Failed to fetch ${Data.url}`);
          }
  
          return res.json();
        });
  
        const AllData = await Promise.all(alldetails);
        return AllData;
      } catch (e) {
        console.error("Error in batch fetch:", e.message);
        return []; // Return empty array on error
      }
    }
  };
  
  // Await only once and prevent redundant calls
  const data = await ConditionalData();
  

  return (  
    <section className="relative h-full mx-auto">
      <Suspense fallback={<div className="container mx-auto h-[90vh] grid place-items-center text-white text-center">loading....</div>}>
      <PokemonList data={data}/>    
      <Pagination prev={previous} next={next}/>
      </Suspense>
    </section>
  );
}
