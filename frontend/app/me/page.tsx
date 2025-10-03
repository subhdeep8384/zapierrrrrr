"use client"
import React, { useEffect } from 'react'
import User from '../components/user'
import { useSession } from 'next-auth/react';

const UserDetails = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      sessionStorage.setItem("session", JSON.stringify(session));
    }
  }, [session]);
  return (
    <div className=''>
      <User></User>
    </div>
  )
}

export default UserDetails
