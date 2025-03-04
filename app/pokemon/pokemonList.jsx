// 'use client'
import React from 'react'
import Pokemon from '../components/cards/pokemon'
import styles from './style.module.scss'

const PokemonList = async({data}) => {
  // const Data = await data
  // console.log(prev,next,count,data)
    
  return (
    <section className='w-full'>
      <div className='w-full text-center my-5'>
      <input placeholder='type charmandor...' className={`${styles.search}`} type='text'/>
      </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
      {
        data.map((data,i)=>(
          <Pokemon key={i} data={data}/>
        ))
      }
    </div>
    </section>
  )
}

export default PokemonList