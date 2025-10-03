"use client"
import React, { useEffect, useState } from 'react'
import { fetchUser } from '../utils/userData'
import Image from 'next/image'

interface UserType {
  username: string
  image: string
}

const User = ({auth , setAuth} : {auth :  number , setAuth : any } ) => {    
    console.log("user component rendered")
    const [user, setUser] = useState<UserType>({ username: "", image: "" })

    setAuth(10)
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetchUser()
                setUser({
                    username: res?.username || "",
                    image:  "https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
                })
            } catch (error) {
                console.error("Failed to fetch user:", error)
            }
        }
        getUser()
    }, [])


    return (
        <div className='flex '>
            <div className='hidden md:block lg:block md:mx-8 lg:mx-12'>{user.username || "No username"}</div>
            {user.image && (
                <div className='rounded-full overflow-hidden'>
                    <Image
                        src={user.image}
                        alt="user"
                        width={50}
                        height={50}
                        unoptimized  
                    />
                </div>
            )}
        </div>
    )
}

export default User
