import { RainbowButton } from "../ui/rainbow-button";
import Link from "next/link";
import GradualSpacing from "../ui/gradual-spacing";
import GlowBg from "../effects/glow";
import React from "react";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import { avatars, testimonials } from "@/data/landing/modulesData";
import AvatarCircles from "../ui/avatar-circles";

export default function Reviews() {
    return (
        <div className="flex flex-col items-center w-full relative my-7  sm:-mt-[35vh] bg-transparent" id="reviews">
            <div className="flex w-full max-w-[1500px] pt-14 px-3 justify-center items-center flex-wrap bg-transparent">
                
                <div className="flex flex-col w-full px-3 justify-center items-center z-10">
                    <div className="flex flex-col items-center w-full gap-1 mb-7">
                        <GradualSpacing
                          direction="left"
                          className=" select-none pointer-events-none text-white text-2xl xl:text-4xl"
                          text="Trusted by Traders"
                        />
                        <div className="flex gap-1 w-full justify-center">
                            <GradualSpacing
                              direction="left"
                              className=" select-none pointer-events-none text-white text-2xl xl:text-4xl"
                              text="Proven by"
                            /> &nbsp;
                            <GradualSpacing
                              direction="left"
                              className=" select-none pointer-events-none text-primaryLight underline underline-offset-4 text-2xl xl:text-4xl bg-gradient-to-br from-[#9C4BE9] to-[#2A73F9] bg-clip-text text-transparent"   
                              text="Exceptional Results"
                            />
                        </div>
                        <p className="mt-5 mb-3 text-xs sm:text-sm w-full text-center text-white/65">Over 1k+ traders trust us for their trading success—what are you waiting for? Take the leap today!</p>
                        <AvatarCircles numPeople={1.2} avatarUrls={avatars} />
                    </div>

                    <AnimatedTestimonials testimonials={testimonials} />

                    <div className="flex gap-4 justify-center items-center">
                        <Link href={'/auth/signup'}><RainbowButton className=" text-white !font-light hover:scale-[1.02] transition-all py-7 px-14">✨ Register Now ✨</RainbowButton></Link>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
