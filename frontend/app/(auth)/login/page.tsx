"use client"
import React from 'react'
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';


const Page = () => {
  return (
    <div className='border-r-2 border-l-2 border-b-2 min-h-screen mx-5 p-8 lg:p-30 flex items-center'>
      <div className='flex flex-col lg:flex-row gap-12 w-full'>
        {/* Left Text Section */}
        <div className='flex-1 text-center lg:text-left'>
          <h1 className='font-bold text-6xl mb-10'>Automate across your teams</h1>
          <p className='text-xl text-gray-500 mb-12'>
            SZapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.
          </p>
        </div>

        {/* Right Form Section */}
        <div className='flex-1 flex justify-center items-center'>
          <button
            onClick={() => {
              const   handle  = async () => { 
                return new Promise(async (resolve) => {
                  const result = await signIn("google", { callbackUrl: "/dashboard" });
                  if ( result ){
                    setTimeout(resolve, 10000);
                  }else{}
                })
              }
              handle().then(() => {toast.success("Successfully logged in")})
            }}
            className='font-bold text-2xl bg-blue-600 text-white border-2 rounded-2xl px-6 py-4 hover:bg-blue-700 transition-colors duration-200'
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
