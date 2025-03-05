'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Pagination = ({next,prev}) => {
    const router = useRouter()
    const params = useSearchParams()
    const offset = params.get('offset') 
    const toggleapi = (action,url)=>{
        if(action=='prev' && url){
            const next_url =  new URL(url).searchParams
            const offset = next_url.get('offset')
            router.push(`/?offset=${offset}`);
        }
        if(action=='next'){
            const next_url =  new URL(url).searchParams
            const offset = next_url.get('offset')
            router.push(`/?offset=${offset}`);            
        }
        return null
    } 
    
  return (
    <div className='fixed bottom-0 mb-5 flex items-center w-full px-10 justify-between' style={{left:'50%', transform:"translateX(-50%)"}}>
    <div className=''>
    <button disabled={!offset||offset==0?true:false} className='navigate-button px-4 py-2 mx-2 cursor-pointer'  onClick={()=>{toggleapi('prev',prev)}}>Prev</button>
    </div>
    <div className=''>
    <button className='bg-white px-4 py-2 mx-2 text-black cursor-pointer' onClick={()=>{toggleapi('next',next)}}>Next</button>
    </div>
    </div>
  )
}

export default Pagination