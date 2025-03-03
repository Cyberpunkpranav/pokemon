import Image from 'next/image'
import React from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
const Pokemon = ({data,i}) => {
  return (
    <Link href={`/pokemon/${data.id}`} className={styles['pokemon-card']} key={i}>
    <Image width={100} height={100} src={data.sprites.other.dream_world.front_default}/>
    <h2>{data.name}</h2>
    <span>{data.height*10} cm</span>
    <span className='mx-3'>|</span>
    <span>{data.weight/10} kg</span>
    </Link>
  )
}

export default Pokemon