import { cn } from "@/lib/utils";
import Marquee from "../ui/marquee";
import { Image } from "@mantine/core";

const screenshots = [
    {img: '1.png',},
    {img: '2.png',},
    {img: '3.png',},
    {img: '4.png',},
    {img: '5.png',},
    {img: '6.png',},
    {img: '7.png',},
    {img: '8.png',},
    {img: '9.png',},
    {img: '10.png',},
    {img: '11.png',},
    {img: '12.png',},
    {img: '13.png',},
    {img: '14.png',},
    {img: '15.png',},
    {img: '16.png',}
]

const ProfitCard = ({
  img,
}: {
  img: string;
}) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl p-2"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <Image src={'/profits/' + img } alt="" className="w-[250px] h-[350px]" fit="cover" radius={"sm"} loading="lazy"  />
      </div>
    </figure>
  );
};

export default function ProfitsMarquee() {
  return (
    <div className="relative flex w-full justify-between items-center flex-col overflow-hidden my-24 z-10 bg-black/10 py-7 backdrop-blur-lg">
      <Marquee pauseOnHover className="[--duration:50s]">
        {screenshots.map((screenshot) => (
          <ProfitCard key={screenshot.img} {...screenshot} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-dark/70"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-dark/70"></div>
    </div>
  );
}