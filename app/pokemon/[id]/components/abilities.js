'use client'
import { useEffect, useState } from "react";

export default function Abilities({ url }) {
    const [data,setdata]=useState(null) 
    async function fetchAbilitites(){
        const response = await fetch(url, { cache: "force-cache" })
        const data = await response.json()
        setdata(data)
        }
        useEffect(()=>{
            fetchAbilitites()
        },[url])
      return (
    <section>
        {
            data?.effect_entries.map((effect,i)=>(
                effect.language.name=='en' && 
                <div key={i}>
                <p>{effect.effect}</p>
                <p>{effect.short_effect}</p>
                </div>
            ))
        }
    </section>
  )
}