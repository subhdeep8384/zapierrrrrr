"use client"
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

const Page = () => {
    const params = useParams()
    const zapid = params.zapid

    useEffect( () => {
        axios.get(`http://localhost:5000/api/v1/zap/${zapid}`, {
            withCredentials: true,
        }).then(res => {
            console.log("the zap is ", res.data)
        })
    } )
  return (
    <div>
      {zapid}
    </div>
  )
}

export default Page
