"use client"
import GoogleButton from '@/app/components/Buttons/GoogleButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const Page = () => {
    const router = useRouter()
    const [form, setForm] = useState({ username: "", password: "", name: "", email: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            username: form.username,
            password: form.password,
            name: form.name,
            email: form.email,
        } )
        router.push("/")
        if (res?.error) {
            console.log("Error:", res.error);
        } else {
            router.push("/")
        }
    };
    return <div className='border-r-2 border-l-2 border-b-2 mx-10 h-[100%]'>
        <div className='flex flex-col lg:flex-row md:flex-row justify-between p-10'>
            <div className='text items-start lg:w-3/5 md:w-3/5 '>
                <div className='font-bold text-6xl mb-10'>Join millions who automate their work using Zapier</div>
                <div className='text-xl text-gray-500 mb-12'>Stop waiting for developers to bring order to your apps. Take control with Zapier, streamline your tasks, and achieve more with less effort.</div>
            </div>
            <div className='w-full h-120  lg:w-2/5 md:w-2/5 border-2'>
                <GoogleButton></GoogleButton>

                <div className='flex flex-col w-full '>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-2 mt-20">
                    <input name="username" placeholder="Username" onChange={handleChange} className="border p-2 hover:bg-gray-400 " />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2" />
                    <input name="name" placeholder="Name" onChange={handleChange} className="border p-2" />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2" />
                    <button type="submit" className="bg-blue-500 hover:bg-sky-950 text-white p-2 mt-2">Sign Up / Sign In</button>
                </form>
                </div>
            </div>
        </div>
    
    </div>
};

export default Page;
