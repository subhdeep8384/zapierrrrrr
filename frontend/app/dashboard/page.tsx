"use client"
import axios from "axios"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import DarkButton from '../components/Buttons/DarkButton'
import { DataTableDemo } from "../components/Table"
import { SkeletonCard } from "../components/Heroskeleton"
import Skeleton from 'react-loading-skeleton'
import { useRouter } from "next/navigation"


interface Zap {
  "id": string,
  "triggerId": string,
  "userId": string,
  "actions": {
    "id": string,
    "zapId": string,
    "actionId": string,
    "sortingOrder": number,
    "type": {
      "id": string,
      "name": string,
    }
  }[],
}


function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.id) return;

    const userid = session.user.id;

    axios
      .get(`http://localhost:5000/api/v1/zap/allzaps/${userid}`, {
        withCredentials: true,
      })
      .then((res) => setZaps(res.data?.zaps || []))
      .catch((err) => console.error("Failed to fetch zaps:", err))
      .finally(() => setLoading(false));
  }, [status, session?.user?.id , zaps]); 

  return { loading, zaps };
} 

const Page = () => {
  const router = useRouter()
  const { loading, zaps } = useZaps()
  const { data: session, status } = useSession()

  if (status === "loading") return <p>Loading...</p>
  if (!session) return <p>Not signed in</p>
  const onclickHandler = () => {
    router.push('/zap/create')
  }
  return (
    <div >
      <div className='flex justify-between items-center p-10'>
        <div><h1 className='text-2xl font-bold '>My zaps</h1></div>
        <div> <DarkButton onClick={onclickHandler}>Create zaps</DarkButton></div>
      </div>

      {loading ? < SkeletonCard/> : <ZapsTable zaps={zaps} />}
    </div>
  )
}
function ZapsTable({ zaps }: { zaps: Zap[] }) {
  return <div className='flex flex-col gap-10'>
      <DataTableDemo zaps={zaps} />
  </div>
}
export default Page
