import { manrope } from "@/utils/font";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";
import BoxReveal from "../ui/box-reveal";
import GradualSpacing from "../ui/gradual-spacing";
import { RainbowButton } from "../ui/rainbow-button";
import { Image } from "@mantine/core";

export default function ComingUp() {
    return(
        <div className="flex flex-col items-center w-full bg-[url(https://i.ibb.co/cXMrrLjv/com5-bg.png)] bg-no-repeat bg-contain sm:bg-cover bg-bottom relative sm:-mt-60">
            
            <div className="flex flex-col sm:flex-row w-full max-w-[1500px] pt-7 px-3 justify-start items-start flex-wrap">

                <div className="flex flex-col w-full sm:w-1/2 px-3 justify-start items-center z-10 gap-4 ">
                    <Image src={'/mockup3.png'} className="max-w-[350px]" loading="lazy" />
                </div>
                
                <div className="flex flex-col w-full sm:w-1/2 justify-center items-start z-10 gap-7 min-h-[600px]">
                    <div className="flex flex-col items-start w-full gap-1">
                        <BoxReveal duration={0.7} className="w-full sm:w-1/2">
                        <div className="flex flex-col w-full items-start gap-4 mb-7">
                            <hr className="w-full opacity-40" />
                            <p className="text-white/65 text-xs max-w-[650px] uppercase">
                                What&apos;s Next
                            </p>
                        </div>
                        </BoxReveal>
                        <div className="flex gap-1 w-full justify-start">
                            <GradualSpacing
                              className={manrope.className + " select-none pointer-events-none text-primaryLight text-2xl xl:text-4xl font-semibold bg-gradient-to-br  from-[#9C4BE9] to-[#2A73F9] bg-clip-text text-transparent"}
                              text="A Glimpse"
                            /> &nbsp;
                            <GradualSpacing
                              className=" select-none pointer-events-none text-white text-2xl xl:text-4xl"   
                              text="Into 2025"
                            />
                        </div>
                        <BoxReveal duration={0.7}>
                        <GradualSpacing
                          className={manrope.className + " select-none pointer-events-none text-white text-2xl xl:text-4xl"}
                          text="Next-Gen Trading Tools Await"
                        /></BoxReveal>
                        <BoxReveal duration={0.7}>
                        <p className="text-white/50 text-md w-full max-w-[500px] mt-5">
                            Stay ahead of the curve with our upcoming features designed to enhance your trading journey. Here&apos;s what to expect: <br /><br />

                            <span className="text-white">• New App for Android and iOS:</span> Trade smarter with our sleek, feature-rich mobile apps. <br />
                            <span className="text-white">• In-App Chats and Live Streams:</span> Connect, learn, and grow with real-time trader discussions and live market insights. <br />
                            <span className="text-white">• Enhanced Dashboard Interface:</span> Experience a seamless, intuitive design for faster decision-making. <br />
                            <span className="text-white">• Daily Updates & Notifications:</span> Never miss critical market events with real-time alerts and updates, right in the app. <br />
                        </p>
                        </BoxReveal>
                        <div className="flex gap-4 items-center mt-12 flex-wrap w-full justify-center sm:justify-start">
                            <Link href={'/auth/signup'}><RainbowButton className=" text-white !font-light hover:scale-[1.02] transition-all py-7 px-14 text-nowrap">Start Your Free Trial Now </RainbowButton></Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}