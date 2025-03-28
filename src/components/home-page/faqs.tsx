import { manrope } from "@/utils/font";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";
import BoxReveal from "../ui/box-reveal";
import GradualSpacing from "../ui/gradual-spacing";
import { RainbowButton } from "../ui/rainbow-button";
import { FaqAccordion } from "./faq/faq";

export default function FaqSection() {
    return (
        <div className="flex flex-col items-center w-full my-7 bg-[url(https://i.ibb.co/qLxXyV7M/com4-bg.png)] bg-no-repeat bg-cover bg-bottom 2xl:bg-contain min-h-screen" id="faqs">
            
            <div className="flex flex-col sm:flex-row w-full max-w-[1500px] pt-7 px-3 justify-start items-start flex-wrap">
                
                <div className="flex flex-col w-full sm:w-1/3 justify-between items-start z-10 gap-7 bg-white h-fit rounded-xl p-7 mb-5">
                    <div className="flex flex-col items-start w-full gap-1">
                        <BoxReveal duration={0.7} className="w-full sm:w-1/2">
                        <div className="flex flex-col w-full items-start gap-4 mb-7">
                            <hr color="#000" className="w-full bg-black text-black" />
                            <p className="text-black/65 text-xs max-w-[650px] uppercase">
                                FAQs
                            </p>
                        </div>
                        </BoxReveal>
                        <BoxReveal duration={0.7}>
                        <GradualSpacing
                          className=" select-none pointer-events-none text-black text-2xl xl:text-4xl"   
                          text="Frequently Asked"
                        /></BoxReveal>
                        <BoxReveal duration={0.7}>
                        <GradualSpacing
                          className={manrope.className + " select-none pointer-events-none text-primaryLight text-2xl xl:text-4xl font-semibold bg-gradient-to-br  from-[#9C4BE9] to-[#2A73F9] bg-clip-text text-transparent"}
                          text="Questions"
                        /></BoxReveal>
                        <BoxReveal duration={0.7}>
                        <p className="text-black/65 text-md w-full max-w-[500px] mt-5">
                        Have questions? We&apos;ve got answers! Explore our FAQ section to learn how Ghostboard empowers traders, maximizes profits, and provides the tools you need to succeed. Whether it&apos;s about features, subscriptions, or support, find everything you need right here.
                        </p>
                        </BoxReveal>
                        <div className="flex gap-4 justify-center items-center mt-12 flex-wrap">
                            <Link href={'/auth/signup'}><RainbowButton className=" text-white !font-light hover:scale-[1.02] transition-all py-7 px-14 text-nowrap"> Register Now </RainbowButton></Link>
                            <Link href={'/pricing'} className={manrope.className + " text-md flex items-center justify-center gap-2 transition-all font-light text-primaryLight py-3 text-nowrap underline underline-offset-4 hover:underline-offset-8"}>
                                Check our plans
                                <IconArrowNarrowRight className=" origin-bottom" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full sm:w-2/3 px-3 justify-start z-10 gap-4 ">

                    <FaqAccordion />

                </div>
                
            </div>

        </div>
    )
}