import React from 'react'
import PokemonDetails from './pokemon'

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