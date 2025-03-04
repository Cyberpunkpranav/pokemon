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
            console.log(action,limit,offset);
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
    <div>
    <div className='fixed left-0 ml-5 top-[50%]'>
    <button className='cursor-pointer'  onClick={()=>{toggleapi('prev',prev)}}>prev</button>
    </div>
    <div className='fixed mr-5 right-0 top-[50%]'>
    <button className='cursor-pointer' onClick={()=>{toggleapi('next',next)}}>next</button>
    </div>
    </div>
  )
}

export default Pagination