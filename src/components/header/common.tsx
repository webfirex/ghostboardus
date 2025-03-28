'use client'
import { manrope } from "@/utils/font";
import { Image } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconGhost2, IconMenu2, IconRocket } from '@tabler/icons-react'
import { BorderBeam } from "../ui/border-beam";

export default function Header() {
    const [subHead, setSubhead] = useState(true)

    useEffect(() => {
        window.onscroll = function () {
          scrollFunction();
        };
    
        return () => {
          window.onscroll = null;
        };
    }, []); // Run this effect only once on component mount

    function scrollFunction() {
        const headerLogo = document.getElementById("headerLogo");
        if (headerLogo) {
          if (
            document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50
          ) {
                headerLogo.style.opacity = "0";
          } else if (
            document.body.scrollTop > 40 ||
            document.documentElement.scrollTop > 40
          ) {
                headerLogo.style.opacity = "0.3";
          } else if (
            document.body.scrollTop > 30 ||
            document.documentElement.scrollTop > 30
          ) {
                headerLogo.style.opacity = "0.5";
          } else if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
          ) {
                headerLogo.style.opacity = "0.7";
          } else {
                headerLogo.style.opacity = "1";
          }
        }
    }

    return (
        <div className="flex w-full h-[110px] justify-center fixed top-0 left-0 flex-col items-center z-50">

            {subHead &&
            <div className="w-full bg-primaryDark/20 flex justify-between items-center backdrop-blur-lg py-2">
                <p></p>
                <Link href={''} className="text-center text-white text-[10px] xl:text-sm transition-all flex gap-1 pr-2 hover:gap-2 hover:pr-1">
                ✨ SALE 15% OFF ALL PLANS | USE CODE FLOW15 | TRADE SMARTER 🏷️ JOIN NOW <span>▸</span>
                </Link>
                <button className="text-white px-2 cursor-pointer" onClick={() => (setSubhead(false))}>x</button>
            </div>}

            <div className="w-full max-w-[1500px] flex justify-between items-center h-full mt-3">
                <div className="flex justify-end h-full items-start sm:items-center max-w-[200px] gap-2">
                    <Link href={'https://discord.gg/kxz5KHjjbu'} className={manrope.className + " flex items-center justify-center gap-2 bg-white/5 scale-[0.98] hover:scale-100 transition-all rounded-full font-light text-white px-3 sm:px-8 py-3 backdrop-blur-lg text-nowrap relative border border-white/10"}>
                        <Image src={'/icons/discord.png'} h={'30px'} w={'30px'} />
                        <span className=" hidden sm:block">Join Discord</span>
                    </Link>
                </div>
                <div className="flex justify-start h-full pt-3 sm:pt-0 items-start sm:items-center max-w-[200px] w-full">
                    <Link href={'/'} id="headerLogo" className=" transition-opacity">
                        <Image src={'/logo-h.png'} className="w-full" />
                    </Link>
                </div>
                <div className="flex justify-end h-full items-start sm:items-center max-w-[200px] gap-2">
                    <Link href={'/auth/signup'} className={manrope.className + " hidden sm:flex items-center justify-center gap-2 bg-white/5 scale-[0.98] hover:scale-100 transition-all rounded-full font-light text-white px-8 py-3 backdrop-blur-lg text-nowrap relative border border-white/10"}>
                        <BorderBeam size={70} />
                        Sign Up
                        <IconGhost2 stroke={'1px'} />
                    </Link>
                    <a href="/dashboard" className={manrope.className + " bg-white/5 border-[0.2px] border-white/10 scale-95 hover:scale-100 transition-all rounded-full font-bold text-white px-5 py-3 backdrop-blur-lg"}>
                        <IconRocket stroke={'1px'} />
                    </a>
                </div>
            </div>

        </div>
    )
}