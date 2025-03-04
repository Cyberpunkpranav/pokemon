'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Stats = ({url}) => {
        console.log(url)
        const [data,setdata]=useState(null) 
        async function fetchStats(){
            const response = await fetch(url, { cache: "force-cache" })
            const data = await response.json()
            setdata(data)
            }
            useEffect(()=>{
                fetchStats()
            },[url])
            console.log(data)
  return (
    <section className='mt-5'>
    <div>
    {data?.affecting_moves?.decrease.length!=0 ? <h4>Moves</h4>:<p>no moves</p>}
        <div>
            <div className='flex flex-wrap items-center gap-x-5'>
            {
        data?.affecting_moves?.decrease?.map((moves)=>(
            <div className='flex items-center'>
            <h5>{moves.move.name}</h5>
            <div className='ml-1 flex items-center'>
            <Image width={15} height={15} src='/arrow-down.png'/>
            <h6>{moves.change}</h6>
            </div>
            </div>
            ))
            }
            </div>
        </div>
        <div>
            <div className='flex flex-wrap items-center gap-x-5'>
            {
            data?.affecting_moves?.increase?.map((moves)=>(
            <div className='flex items-center'>
            <h5>{moves.move.name}</h5>
            <div className='ml-1 flex items-center'>
            <Image width={15} height={15} src='/arrow-up.png'/>
            <h6>{moves.change}</h6>
            </div>
            </div>
            ))
            }
            </div>
        </div>
    </div>
    </section>
  )
}

export default Stats