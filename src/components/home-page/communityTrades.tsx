import { manrope } from "@/utils/font";
import { Image } from "@mantine/core";
import { IconArrowNarrowRight, IconChecks } from "@tabler/icons-react";
import Link from "next/link";
import BoxReveal from "../ui/box-reveal";
import GradualSpacing from "../ui/gradual-spacing";
import GlowBg from "../effects/glow";

export default function CommunityTrades() {
    return (
        <div className="flex flex-col items-center w-full my-7 bg-[url(https://i.ibb.co/PvfYrLhY/com3-bg.png)] bg-no-repeat bg-cover bg-bottom min-h-screen relative" id="about">
            
            <div className="flex flex-col-reverse sm:flex-row w-full max-w-[1500px] pt-7 px-3 justify-center items-center flex-wrap">
                
                <div className="flex flex-col w-full sm:w-1/2 px-3 justify-center z-10 gap-4">

                    <BoxReveal duration={0.7} className="w-full sm:w-1/2">
                    <div className="flex flex-col w-full items-start gap-4 mb-7">
                        <hr className="w-full opacity-40" />
                        <p className="text-white/65 text-xs max-w-[650px] uppercase">
                            Powered By AI
                        </p>
                    </div>
                    </BoxReveal>


                    <BoxReveal duration={0.7}>
                    <span className=" select-none pointer-events-none whitespace-pre-wrap bg-gradient-to-br from-white to-zinc-300/80 bg-clip-text text-lg sm:text-2xl font-normal leading-snug text-transparent">
                        The Edge You Need
                    </span>
                    </BoxReveal>

                    <BoxReveal duration={0.7}>
                    <p className="text-white/65 text-md w-full max-w-[500px]">
                    In today&apos;s fast-moving markets, success comes down to having the right tools and insights at the right time. That&apos;s where we come in. Powered by advanced AI technology, our platform analyzes market trends, identifies opportunities, and delivers actionable insights—helping you make smarter, faster, and more profitable decisions. Whether you&apos;re day trading or navigating complex options strategies, we&apos;ve got your back with cutting-edge tools designed for peak performance.
                    </p>
                    </BoxReveal>

                    <div className="flex gap-4 w-full justify-start mt-4">
                        <BoxReveal duration={0.7}>
                        <Link href={'/pricing'} className={manrope.className + " text-md flex items-center justify-center gap-2 transition-all font-light text-primaryLight py-3 text-nowrap underline underline-offset-4 hover:underline-offset-8"}>
                            Check our plans
                            <IconArrowNarrowRight className=" origin-bottom" />
                        </Link>
                        </BoxReveal>
                    </div>
                </div>
                
                <div className="flex flex-col w-full sm:w-1/2 px-3 justify-center items-start z-10 gap-7">
                    <div className="flex flex-col items-center sm:items-end w-full gap-1">
                        <div className="flex gap-1 w-full justify-center sm:justify-end">
                            <GradualSpacing
                              className=" select-none pointer-events-none text-white text-2xl xl:text-4xl"   
                              text="Why Traders"
                            /> &nbsp;
                            <GradualSpacing
                              className={manrope.className + " select-none pointer-events-none text-primaryLight text-2xl xl:text-4xl font-semibold bg-gradient-to-br  from-[#9C4BE9] to-[#2A73F9] bg-clip-text text-transparent"}
                              text="Trust Us"
                            />
                        </div>
                        <GradualSpacing
                          className=" select-none pointer-events-none text-white text-2xl xl:text-4xl"
                          text="to Stay Ahead of the Market"
                        />
                    </div>
                    <video src="/ghostvid.mp4" autoPlay muted loop className="w-full h-auto aspect-video max-w-[700px] rounded-md"></video>
                </div>
                
            </div>
            
            {/* <GlowBg /> */}

        </div>
    )
}