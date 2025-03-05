'use client'
import React, { useEffect, useState } from 'react'
import Pokemon from '../components/cards/pokemon'
import styles from './style.module.scss'
import { useRouter, useSearchParams } from 'next/navigation'

const PokemonList = ({data}) => {
  console.log('data',data)
  const router = useRouter()
  const params = useSearchParams()
  const searchparam = params.get('search')
  const [search,setsearch] = useState(searchparam?searchparam:'')
  useEffect(()=>{
    if(!search || search.length==0)router.push('/')
  },[search])
console.log(data)
  return (
    <section className='container mx-auto px-5 md:px-4 lg:px-2'>
    <div className='w-full text-center my-5'>
    <input placeholder='type charmandor...' value={search?search:''} onChange={(e)=>setsearch(e.target.value)} className={`${styles.search}`} type='text'/>
    <button className={styles['search-button']} onClick={()=>router.push(`?search=${search}`)}>search</button>
    </div>
    {
      Array.isArray(data) ? 
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
      {
        data.map((data,i)=>(
          <Pokemon key={i} data={data}/>
        ))
      }
    </div>
    :
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
      {
        data ? 
        <Pokemon data={data}/>
        : <section className='container mx-auto h-[90vh] w-full '>
          <h3>No pokemon found</h3>
        </section>
      }
   
    </div>
    }

  </section>
  )
}

export default PokemonList