"use client"
import React from 'react'
import { signIn } from 'next-auth/react';


const Page = () => {
  return (

    <div className='border-r-2  border-l-2 border-b-2 h-[100%] mx-5 p-8 lg:p-30 '>
      <div className='flex flex-col lg:flex-row gap-19'>
        <div className='text mt-50'>
          <div className='font-bold text-6xl mb-10'>Automate across your teams</div>
          <div className='text-xl text-gray-500 mb-12'>SZapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.</div>
        </div>
        <div className=' h-120 bg-white-400 lg:w-2/5  border-2'>
          <form
            action={async () => {
              const token =  await signIn("google" , { callbackUrl: "/" })
            }}
          >
            <button type="submit">Sign in</button>
          </form>

        </div>
      </div>

    </div>
  )
}

export default Page
