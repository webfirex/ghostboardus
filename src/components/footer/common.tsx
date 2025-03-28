import { Image } from "@mantine/core";
import { IconBrandDiscord, IconBrandInstagram, IconBrandX, IconBrandYoutube } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname()

    return (
        <div className={(pathname === '/' && " bg-[url(/com5-bg-f.png)] bg-no-repeat bg-contain sm:bg-cover bg-top ") + (" !w-full flex flex-col justify-center items-center pt-10 md:py-10 md:px-7")}>
            <div className="w-full max-w-[1500px] p-10 !pb-4 border border-white/10 rounded-xl backdrop-blur-sm bg-white/5 flex flex-col justify-center gap-7">
                
                <div className="flex w-full justify-between flex-wrap gap-5">
                    <div className="flex flex-col gap-4 items-center md:items-start md:max-w-[300px]">
                        <Image src={'/logo-f.png'} className="max-w-[150px]" alt=" " />
                        <p className="text-xs text-zinc-400 text-center md:text-left">Delivering cutting-edge AI-powered market insights, helping traders stay ahead with real-time data and expert analysis. Join our community of pro traders and take your trading game to the next level!</p>
                        <div className="flex gap-2 items-center">
                            <Link target="_blank" href={'https://x.com/GhostOptions_'}><IconBrandX stroke={'1'} /></Link>
                            <Link target="_blank" href={'https://www.youtube.com/@GHOSTBOARD'}><IconBrandYoutube stroke={'1'} /></Link>
                            <Link target="_blank" href={'https://discord.gg/kxz5KHjjbu'}><IconBrandDiscord stroke={'1'} /></Link>
                            <Link target="_blank" href={'https://www.instagram.com/ghostboardapp/'}><IconBrandInstagram stroke={'1'} /></Link>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 md:gap-10 md:w-auto w-full justify-center md:justify-end">
                        <div className="flex flex-col gap-1 items-center md:items-end w-[250px] md:w-auto max-w-[300px]">
                            <h3 className="text-sm text-right mb-3">Site Links</h3>
                            <Link href={'/#about'} className="text-sm text-zinc-400 hover:text-primaryLight transition-all">About Us</Link>
                            <Link href={'/#faqs'} className="text-sm text-zinc-400 hover:text-primaryLight transition-all">Faqs</Link>
                            <Link href={'/#features'} className="text-sm text-zinc-400 hover:text-primaryLight transition-all">Our Features</Link>
                            <Link href={'/pricing'} className="text-sm text-zinc-400 hover:text-primaryLight transition-all">Pricing</Link>
                            <Link href={'/#reviews'} className="text-sm text-zinc-400 hover:text-primaryLight transition-all">Reviews</Link>
                        </div>
                        <div className="flex flex-col gap-1 items-center md:items-end w-[250px] md:w-auto max-w-[300px]">
                            <h3 className="text-sm text-right mb-3">Legal</h3>
                            <Link href={'/legal/terms'} className="text-sm text-zinc-400 hover:text-primaryLight transition-all">Terms & Conditions</Link>
                            <Link href={'/legal/privacy'} className="text-sm text-zinc-400 hover:text-primaryLight transition-all">Privacy Policy</Link>
                        </div>
                        <div className="flex flex-col gap-1 items-center md:items-end w-[250px] md:w-auto max-w-[300px]">
                            <h3 className="text-sm text-right mb-3">Contact Us</h3>
                            <Link href={'mailto:support@ghostboard.net'} className="text-sm text-zinc-400 hover:text-primaryLight transition-all">support@ghostboard.net</Link>
                            <Link href={'mailto:hello@ghotboard.net'} className="text-sm text-zinc-400 hover:text-primaryLight transition-all">hello@ghostboard.net</Link>
                        </div>
                    </div>
                </div>

                <div className="w-full flex border-t border-white/5 justify-center items-center p-3 pb-0">
                    <p className="text-xs text-zinc-400 text-center">Copyright © 2025 | GHOSTBOARD LLC | All Rights Reserved & All Wrongs Reserved</p>
                </div>

            </div>
        </div>
    )
}