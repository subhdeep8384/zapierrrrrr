"use client";
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import SignInButtons from './Buttons/SignInButtons';
import Features from './Features';
const HeroSection = () => {
  const router = useRouter()
  return (
    <div className='p-10 mx-3 border-gray-400 border-l-1 border-r-1 border-b-1 h-[100%]  lg:mx-50 lg:p-20 lg:h-screen'>
      <div className='flex flex-col justify-between items-center md:flex md:flex-row'>
        <div className='text'>
          <div className='text-gray-500 text-sm mb-4'>SCALE AI AGENTS WITH ZAPIER</div>
          <h1 className='text-5xl font-semibold mb-10'>The most connected AI orchestration platform</h1>
          <p className='text-gray-500 text-xl'>Build and ship AI workflows in minutes-No IT bottlenecks , no complexity. Just results</p>
          <div className='buttons flex items-start mt-8 justify-between  gap-4'>
            <div className='gap-2 flex'>
              <div className='mb-3'>
                <SignInButtons onclick={() => { router.push('/signup') }} color='white'>sign in gmail</SignInButtons>
              </div>
              <div>
                <SignInButtons onclick={() => { router.push('/signup') }} color='amber'>sign in google</SignInButtons>
              </div>
            </div>
          </div>
          <div className='flex'>
            <Features title='Free forever' subtitle="for core features"></Features>
            <Features title='More apps' subtitle="than any other platform"></Features>
            <Features title='Cutting-edge' subtitle="AI features"></Features>
          </div>
        </div>



        <div>
          <Image src="https://res.cloudinary.com/zapier-media/image/upload/f_auto/q_auto/v1745602193/Homepage/hero-illo_orange_ilrzpu.png" alt="An illustration of several shapes representing AI orchestration"
            width={900}
            height={100}
            className="css-9whsf3"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
