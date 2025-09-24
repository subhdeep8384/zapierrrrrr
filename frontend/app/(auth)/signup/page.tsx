import React from 'react';

const Page = () => {
    return <div className='border-r-2'>

        <div className='flex justify-between p-6 items-center border-b-2 border-gray-400'> 
        <div className='text-2xl font-bold text-amber-600' >Zapier</div>

        <div className='flex items-center gap-12'>
           <div className='hidden lg:flex md:flex'> AI automation for your business</div>
            <button className='bg-amber-400  rounded-xl px-3 py-1 hover:bg-white hover:shadow-md '>Contact-us</button>
        </div>
        </div>
      

        <div className='flex flex-col lg:flex-row md:flex-row justify-between p-10'>
            <div className='text items-start lg:w-3/5 md:w-3/5 '>
                <div className='font-bold text-6xl mb-10'>Join millions who automate their work using Zapier</div>
                <div className='text-xl text-gray-500 mb-12'>Stop waiting for developers to bring order to your apps. Take control with Zapier, streamline your tasks, and achieve more with less effort.</div>
            </div>
            <div className='w-full h-120 bg-red-400 lg:w-2/5 md:w-2/5'>
                hello bhai
            </div>
        </div>
    </div>
};

export default Page;
