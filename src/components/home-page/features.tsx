import { RainbowButton } from "../ui/rainbow-button";
import Link from "next/link";
import { Image } from "@mantine/core";
import GradualSpacing from "../ui/gradual-spacing";
import GlowBg from "../effects/glow";
import React from "react";
import { cn } from "@/lib/utils";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import BoxReveal from "../ui/box-reveal";

export function FeaturesSection() {
  const features = [
    {
      title: "Reveal Hidden Institutional Trades",
      description:
        "Access insider-like data from dark pools to track undisclosed market movements",
      skeleton: <SkeletonTwo img='/modules/darkpool.png' />,
      className: "border-b col-span-1 lg:col-span-2 border-neutral-800",
    },
    {
      title: "Uncover Market Moves in Real-Time",
      description:
        "Monitor large-scale trades to spot emerging trends and stay one step ahead of institutional market movements.",
      skeleton: <SkeletonOne img='/modules/flow.png' />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-l border-neutral-800",
    },
    {
      title: "AI Insights for Smarter Trades",
      description:
        "Leverage AI-powered analysis to predict market behavior and optimize your trading strategies",
      skeleton: <SkeletonOne img='/modules/flowai.png' />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r border-neutral-800",
    },
    {
      title: "Decode Market Volatility Dynamics",
      description:
        "Analyze gamma exposure to anticipate market shifts and gain a tactical edge",
      skeleton: <SkeletonTwo img='/modules/netgamma.png' />,
      className: "border-b col-span-1 lg:col-span-2 border-neutral-800",
    },
  ];
  return (
    <div className="relative z-20 py-10 w-full" id="features">

      <div className="relative w-full bg-black/30 backdrop-blur-lg">
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:border rounded-3xl overflow-hidden border-neutral-800 w-full">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-primaryLight text-xl md:text-2xl md:leading-snug">
        <BoxReveal duration={0.7}>{children}</BoxReveal>
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-center font-normal text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
        <BoxReveal duration={0.7}>{children}</BoxReveal>
    </p>
  );
};

export const SkeletonOne = ({ img }: {img: string}) => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 rounded-xl backdrop-blur-lg mx-auto bg-neutral-900/30 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
          <Image
            src={img}
            alt="header"
            width={800}
            height={800}
            className="h-full w-full max-h-[500px] aspect-square object-cover object-left-top rounded-sm"
            loading="lazy"
          />
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-black via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonTwo = ({ img }: {img: string}) => {
    return (
      <div className="relative flex py-8 px-2 gap-10 h-full">
        <div className="w-full p-5 rounded-xl backdrop-blur-lg mx-auto shadow-2xl group h-full">
          <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
            <Image
              src={img}
              alt="header"
              width={800}
              height={800}
              className="h-full w-full max-h-[500px] aspect object-cover object-center rounded-sm"
              loading="lazy"
            />
          </div>
        </div>
  
        <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-black via-black to-transparent w-full pointer-events-none" />
        <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-black via-transparent to-transparent w-full pointer-events-none" />
      </div>
    );
};

export const SkeletonThree = () => {
  return (
    <Link
      href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
      target="__blank"
      className="relative flex gap-10  h-full group/image"
    >
      <div className="w-full  mx-auto bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
          {/* TODO */}
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto " />
          <Image
            src="https://assets.aceternity.com/fireship.jpg"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
            loading="lazy"
          />
        </div>
      </div>
    </Link>
  );
};

export default function Features() {
    return (
        <div className="flex flex-col items-center w-full relative my-7 -mt-80 bg-[url(https://i.ibb.co/wNJvqHR6/com-bg.png)] md:bg-[url(https://i.ibb.co/Y4gQZj0N/ai-bg.png)] bg-no-repeat bg-cover md:bg-contain bg-top">
            <div className="flex w-full max-w-[1500px] pt-80 px-3 justify-center items-center flex-wrap">
                
                <div className="flex flex-col w-full px-3 justify-center items-center z-10">
                    <div className="flex flex-col items-center w-full gap-1 mb-7">
                        <div className="flex gap-1 w-full justify-center">
                            <GradualSpacing
                              direction="left"
                              className=" select-none pointer-events-none text-white text-2xl xl:text-4xl"   
                              text="AI-Driven"
                            /> &nbsp;
                            <GradualSpacing
                              direction="left"
                              className=" select-none pointer-events-none text-primaryLight underline underline-offset-4 text-2xl xl:text-4xl bg-gradient-to-br from-[#9C4BE9] to-[#2A73F9] bg-clip-text text-transparent"   
                              text="Features"
                            /> &nbsp;
                            <GradualSpacing
                              direction="left"
                              className=" select-none pointer-events-none text-white text-2xl xl:text-4xl"   
                              text="Built to"
                            />
                        </div>
                        <GradualSpacing
                        direction="left"
                          className=" hidden sm:block select-none pointer-events-none text-white text-2xl xl:text-4xl"
                          text="Outperform, Adapt, and Maximize Your Profits"
                        />
                        <GradualSpacing
                        direction="left"
                          className=" sm:hidden block select-none pointer-events-none text-white text-2xl xl:text-4xl"
                          text="Outperform, Adapt, and"
                        />
                        <GradualSpacing
                        direction="left"
                          className=" sm:hidden block select-none pointer-events-none text-white text-2xl xl:text-4xl"
                          text="Maximize Your Profits"
                        />
                    </div>

                    <FeaturesSection />

                    <div className="flex gap-4 justify-center items-center">
                        <Link href={'/auth/signup'}><RainbowButton className=" text-white !font-light hover:scale-[1.02] transition-all py-7 px-14">Exlplore All Modules</RainbowButton></Link>
                    </div>
                </div>
                
            </div>
            <GlowBg />
        </div>
    )
}
