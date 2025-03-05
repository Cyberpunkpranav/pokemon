'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Pagination = ({next,prev,count}) => {
    const router = useRouter()
    const toggleapi = (action,url)=>{
        if(action=='prev' && url){
            const next_url =  new URL(url).searchParams
            const limit  =  next_url.get('limit')
            const offset = next_url.get('offset')
            router.push(`/?offset=${offset}`);
        }
        if(action=='next'){
            const next_url =  new URL(url).searchParams
            const limit  =  next_url.get('limit')
            const offset = next_url.get('offset')
            router.push(`/?offset=${offset}`);            
        }
        return null
    } 

  return (
    <div className='fixed bottom-0 flex items-center w-full justify-center' style={{left:'50%', transform:"translateX(-50%)"}}>
    <div className=''>
    <button className='bg-white px-4 py-2 mx-2 text-black cursor-pointer'  onClick={()=>{toggleapi('prev',prev)}}>prev</button>
    </div>
    <div className=''>
    <button className='bg-white px-4 py-2 mx-2 text-black cursor-pointer' onClick={()=>{toggleapi('next',next)}}>next</button>
    </div>
    </div>
  )
}

export default Pagination