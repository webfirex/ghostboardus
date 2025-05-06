"use client"
import { Image } from "@mantine/core";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";
import { encodeUserId } from "@/utils/tools/idEncoder";

export default function ThankYou() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      countdown > 0 && setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
      const hashedId = encodeUserId(id);
      Cookies.set('user_id', hashedId, { expires: 90, path: '/' });
    } else {
      console.log("Cookie Not Set")
    }

    if (countdown === 0) {
      router.push(`https://ghostboard.net/thankYou?id=${id}`)
    }
  }, [countdown, router])

    
    return (
        <div className="flex w-full justify-between items-center flex-col h-screen p-7">
                
            <Image src={'/logo-h-x.png'} w={200} mb={'lg'} />

            <div className="flex flex-col w-full justify-center items-center">

                <h1 className=" text-white text-center text-4xl">Welcome To <span className=" text-primaryLight">GhostBoard</span> !</h1>
                <p className="text-center max-w-[500px] text-xs text-zinc-400 mt-3">Get ready to supercharge your stock options trading with AI-powered insights and advanced analytical tools. Say goodbye to guesswork and hello to smarter, data-driven decisions. Dive in, explore, and take your trading to the next level!</p>

                <Image src={'/slides/1.png'} className="max-w-[500px] rounded-md mt-4" />

                <h1 className="text-md font-bold mt-3">Redirecting to dashboard in {countdown} seconds...</h1>

            </div>

            <div className="flex w-full justify-center p-3">
            </div>

        </div>
    )
}