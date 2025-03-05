'use client'
import Image from 'next/image'
import React from 'react'
import styles from './styles.module.scss'
import Abilities from './components/abilities'
import Stats from './components/stats'

const PokemonDetails = ({data}) => {
  console.log(data)
  return (
    <section className='container h-[100vh] p-4 md:p-7 lg:p-10 mx-auto'>
    <div className={styles.pokemon_details}>
      <div className="flex w-full items-center lg:justify-content-between">
      <Image className={styles.poke_image} width={100} height={100} src={data.sprites.other.dream_world.front_default}/>
      <main className='ml-5 text-right w-full'>
      <h1 className='text-white'>{data.name.toUpperCase()}</h1>
      <h4><span>Height : </span>{data.height*10} cm</h4>
      <h4><span>Weight : </span>{data.weight/10} kg</h4>
      <div className="flex items-center justify-end">
      <h4>Type :</h4>
      <div>
      {data?.types.map((types)=>(
        <h5 className='inline ml-2'>{types.type.name}</h5>))    
        }
        </div>
      </div>

      </main>
      </div>
      <div className='my-5' style={{borderTop:'1px solid gray'}}>
        <h2 className='my-5'>Abilities</h2>
        {
          data.abilities.map((data,i)=>(
            <div key={i}>
            <h3 className='mt-3'>{data.ability.name}</h3>
            <Abilities url={data.ability.url} />
            </div>
          ))
        }
      </div>
      <div className='my-10'>
        <h2>Stats</h2>
        
        <div className=''>
        {
          data.stats.map((data,i)=>(
            <div className={`${styles.stats} gap-10 my-10 p-5`}>
            <div className='flex items-center gap-x-5' key={i}>
            <h3>{data.stat.name.toUpperCase()} :</h3>
            <h4>{data.base_stat} EV</h4>
            </div>
            <Stats url={data.stat.url} />
            </div>
          ))
        }
        </div>
      </div>
    </div>
    </section>
  )
}

export default PokemonDetails