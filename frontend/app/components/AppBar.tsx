"use client";


import React from 'react'
import LinkButton from './Buttons/LinkButton'
import { useRouter } from 'next/navigation';
import PrimaryButton from './Buttons/PrimaryButton';
const AppBar = () => {
  const router = useRouter();

  return (



    <div className='flex border-b-2 justify-between items-center p-5 h-12'>
      <div className='text-2xl font-bold text-amber-600'>
        <div className='flex'>
          <div className='text-black font-extrabold'>_</div>
          <div onClick={()=>{router.push("/")}} className='shadow-xs'>Zapier</div>
        </div>
      </div>
      <div className='flex gap-5 font-light text-sm'>

        <LinkButton onclick={() => {router.push('/contact') }} > Contact Sales</LinkButton>
        <LinkButton onclick={() => router.push("/login")} > Log-In</LinkButton>
        <PrimaryButton onClick={() => { router.push("/signup") }} width={{ x: 5, y: 1 }}>
          Sign-Up
        </PrimaryButton>

      </div>  
    </div>
  )
}

export default AppBar
