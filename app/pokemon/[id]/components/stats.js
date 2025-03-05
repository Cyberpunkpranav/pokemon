'use client'
import PoliwhirlStatsChart from '@/app/components/graph'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Stats = ({url}) => {
        const [data,setdata]=useState(null) 
        async function fetchStats(){
            const response = await fetch(url, { cache: "force-cache" })
            const data = await response.json()
            setdata(data)
            }
            useEffect(()=>{
                fetchStats()
            },[url])
            const GetMoves = (dec,inc)=>{
                let arr = []
                const decrease = dec.map(item => item.move.name);
                const increase = inc.map(item => item.move.name);
                arr.push(decrease) [decrease + increase]
                arr = [...arr,increase]
                return arr.flat()
            }
            const GetChange = (dec,inc)=>{
                let arr = []
                const decrease = dec.map(item => item.change);
                const increase = inc.map(item => item.change);
                arr.push(decrease) [decrease + increase]
                arr = [...arr,increase]
                return arr.flat()
            }
  return (
    <section className='mt-5'>
    <div>
        <div>
            <div className='flex flex-wrap items-center gap-x-5'>
                {
            data?.affecting_moves?.decrease.length!=0 ? 
                    <>
                     {
                    data?.affecting_moves?.decrease&&data?.affecting_moves?.increase?<PoliwhirlStatsChart labels={GetMoves(data?.affecting_moves?.decrease,data?.affecting_moves?.increase)} data={GetChange(data?.affecting_moves?.decrease,data?.affecting_moves?.increase)}/>:<div>loading...</div>
                    }
                    </>
                    :<></>
                }
           
            
            {/* {
        data?.affecting_moves?.decrease?.map((moves)=>(
            <div className='flex items-center'>
            <h5>{moves.move.name}</h5>
            <div className='ml-1 flex items-center'>
            <Image width={15} height={15} src='/arrow-down.png'/>
            <h6>{moves.change}</h6>
            </div>
            </div>
            ))
            } */}
            </div>
        </div>
        <div>
            {/* <div className='flex flex-wrap items-center gap-x-5'>
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
            </div> */}
        </div>
    </div>
    </section>
  )
}

export default Stats