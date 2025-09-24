"use client";
import React from 'react'
import Image from 'next/image'
import { BiLogoGmail } from 'react-icons/bi';
import LinkButton from './Buttons/LinkButton';
import PrimaryButton from './Buttons/PrimaryButton';
import { useRouter } from 'next/navigation';
const HeroSection = () => {
  const router = useRouter()
  return (
    <div className='p-10 mx-3 border-gray-400 border-l-1 border-r-1 border-b-1 h-[100%]  lg:mx-50 lg:p-20 lg:h-screen'>
      <div className='flex flex-col justify-between items-center md:flex md:flex-row'>
        <div className='text'>
          <div className='text-gray-500 text-sm mb-4'>SCALE AI AGENTS WITH ZAPIER</div>
          <h1 className='text-5xl font-semibold mb-10'>The most connected AI orchestration platform</h1>
          <p className='text-gray-500 text-xl'>Build and ship AI workflows in minutes-No IT bottlenecks , no complexity. Just results</p>
          <div className='buttons flex items-start mt-8 justify-between max-w-1/2 gap-4'>
          <div className='flex  gap-4'>
            <LinkButton  onclick={()=>{router.push("/signup")}}>Start free with email
            <BiLogoGmail className='text-5xl'/>
            </LinkButton>
            
            <PrimaryButton width={{x:10 , y:1}} onClick={()=>{router.push('/signup')}}>Start free with Google</PrimaryButton>
          </div>
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
