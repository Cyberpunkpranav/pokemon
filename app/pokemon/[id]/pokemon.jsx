import Image from 'next/image'
import React from 'react'

const PokemonDetails = ({data}) => {
    console.log(data)
  return (
    <section className='container mx-auto'>
    <Image width={100} height={100} src={data.sprites.other.dream_world.front_default}/>
    <div className='text-white'>{data.name}</div>
    </section>
  )
}

export default PokemonDetails