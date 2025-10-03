import React from 'react'
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const GoogleButton = () => {
  return (
    <div>
            <button
                    onClick={() => signIn('google')}
                    className="flex justify-center w-full mt-4"
                >   
                    <div className="flex  w-full bg-sky-600 rounded-2xl mx-7 py-3 lg:py-3 lg:rounded-md justify-center gap-12 items-center hover:bg-sky-800 cursor-pointer">
                        <div className='text-3xl'><FaGoogle></FaGoogle></div>
                        <div className='hidden md:block  lg:block lg:text-2xl lg:items-center md:text-xl'>Sign in with Google</div>
                    </div>
            </button>
    </div>
  )
}

export default GoogleButton
