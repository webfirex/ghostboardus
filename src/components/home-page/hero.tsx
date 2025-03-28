import FlickerBg from "../effects/flicker";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { Highlight } from "../ui/hero-highlight";
import { IconArrowNarrowRight, IconArrowRight } from "@tabler/icons-react";
import { RainbowButton } from "../ui/rainbow-button";
import { manrope } from "@/utils/font";
import Link from "next/link";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { Image } from "@mantine/core";

export default function HeroSection() {
    return (
        <div className="flex flex-col items-center w-full relative bg-[url(https://i.ibb.co/wFZ7RVgn/com2-bg.png)] bg-no-repeat bg-cover bg-top min-h-[90vh] pt-[50px]">
            <div className="flex flex-col w-full max-w-[1500px] py-7 px-3 justify-center items-center z-10 gap-4">

                <ContainerScroll
                  titleComponent={
                    <>
                        <div className="flex flex-col w-full max-w-[1500px] px-3 justify-center items-center z-10 gap-4">
                            <AnimatedShinyText className=" text-sm sm:text-base select-none border border-white/10 rounded-full cursor-pointer inline-flex items-center justify-center px-4 py-1 transition ease-out hover:duration-300 hover:text-neutral-400">
                              <span>✨ AI Trading Analysis</span>
                              <IconArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                            </AnimatedShinyText>

                            <span className=" select-none pointer-events-none whitespace-pre-wrap bg-gradient-to-br from-white to-zinc-300/80 bg-clip-text text-center text-2xl sm:text-5xl font-semibold leading-relaxed sm:leading-normal text-transparent">
                                Trade Smarter. Win Bigger. <br /> Stay <Highlight className="text-white py-2 italic font-medium">Ahead of the Market</Highlight> Every Single Day.
                            </span>

                            <p className="text-center text-white/65 w-full max-w-[650px] text-xs sm:text-sm">
                            Advanced Dashboard Empowering Traders & Investors With Real-Time Institutional Level Data & Tools. Use Wall Street Level Tools Powered By AI For Just $49 / Month & Reveal Game Changing Stock Options Data
                            </p>

                            <div className="flex gap-4 justify-center items-center mt-4 flex-wrap">
                                <Link href={'/auth/signup'}><RainbowButton className=" text-white !font-light hover:scale-[1.02] transition-all py-7"> ✨ Try Now For Free</RainbowButton></Link>
                                <Link href={'https://www.youtube.com/@GHOSTBOARD/videos'} className={manrope.className + " flex items-center justify-center gap-2 scale-[0.98] hover:scale-100 transition-all font-light text-white px-8 py-3 text-nowrap hover:underline underline-offset-4 "}>
                                    How It Works
                                    <IconArrowNarrowRight />
                                </Link>
                            </div>
                        </div>
                    </>
                  }
                >
                  <Image
                    src={`https://i.ibb.co/CK6TSBVR/dashboard.png`}
                    alt="hero"
                    // height={720}
                    // width={1400}
                    className=" rounded-xl object-cover h-full w-full object-left-top"
                    draggable={false}
                    loading="lazy"
                  />
                </ContainerScroll>
                
            </div>
            {/* <FlickerBg /> */}
        </div>
    )
}