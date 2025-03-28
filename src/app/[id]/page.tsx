// "use client";

// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import { use, useEffect, useState } from "react";

// export default function IndicatorDetails({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const {id} = use(params);
//   const router = useRouter();

//   useEffect(() => {
//     if (id) {
//         Cookies.set("reffcode", id, { expires: 1 });
//         router.push("/");
//     }
//   }, [id]);

//   return (null);
// }

'use client'
import LoadAnimation from "@/components/animations/loadAnimation";
import Header from "@/components/header/common";
import ComingUp from "@/components/home-page/comingUp";
import CommunityTrades from "@/components/home-page/communityTrades";
import FaqSection from "@/components/home-page/faqs";
import Features from "@/components/home-page/features";
import HeroSection from "@/components/home-page/hero";
import ProfitsMarquee from "@/components/home-page/profitsSlide";
import Reviews from "@/components/home-page/reviews";
import StocksMarquee from "@/components/home-page/stocksSlide";
import WhyUs from "@/components/home-page/whyUs";
import { Button, Dialog, Group, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import Cookies from "js-cookie";

export default function Home({params}: {params: Promise<{ id: string }>;}) {
  const [opened, { toggle, close }] = useDisclosure(true);
  const {id} = use(params);


  useEffect(() => {
    if (id) {
        Cookies.set("reffcode", id, { expires: 7 });
    }
  }, [id]);
  
  return (
    <>
      <Header />
      <div className="flex min-h-screen h-full flex-col items-center w-full overflow-x-hidden">
        <HeroSection />
        <WhyUs />
        <StocksMarquee />
        <Features />
        <CommunityTrades />
        <Reviews />
        <ProfitsMarquee />
        <FaqSection />
        <ComingUp />
      </div>
    </>
  );
}