import React from 'react'

const Features = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return (
        <div className='flex mt-5 justify-between  lg:flex-row'>
            <Check />
            <div className='lg:flex-4'>
                <div className='text-gray-950 font-bold'>{title}</div>
                <div className='text-shadow-gray-500'>{subtitle}</div>
            </div>
        </div>
    )
}

export default Features
function Check() {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>

    </div>
}