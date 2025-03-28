'use client'
import { Sidebar } from "@/data/landing/links"
import { Badge, Divider, Image, MultiSelect, NavLink, Tooltip } from "@mantine/core"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import ShineBorder from "../ui/shine-border"
import { IconBrandDiscordFilled, IconCaretLeftFilled, IconCaretRightFilled, IconPointFilled, IconSearch } from "@tabler/icons-react"

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);

export default function SideBar({ isExpanded, setisExpanded }: { isExpanded: boolean; setisExpanded: React.Dispatch<React.SetStateAction<boolean>> }) {

    const SidebarLinks = Sidebar
    const pathname = usePathname()

    // const [isExpanded, setisExpanded] = useState(true)

    function isActive(path: string) {
        if(path === pathname) {return true} else {false}
    }

    return (
        <div className={(isExpanded ? ' min-w-[210px] w-[200px] maxTab:absolute z-50 ' : ' hidden w-[70px] ') + "sm:flex flex-col h-screen justify-between bg-zinc-500/5 min-w-[70px] p-2 transition-all backdrop-blur-xl"}>
            <div className="w-full flex justify-center items-center p-3 rounded-sm">
                <button  onClick={() => {!isExpanded ? setisExpanded(true) : setisExpanded(false)}} className="flex justify-center items-center font-bold relative">
                    <Image src={SidebarLinks.logo.image} alt="logo" className="w-[30px]" /> {isExpanded && <>&nbsp;GHOSTBOARD</>}
                    {isExpanded ? <IconCaretLeftFilled className="absolute -right-5" size={'14'} /> : <IconCaretRightFilled className="absolute -right-5" size={'14'} />}
                </button>
            </div>

            <div className="flex flex-col w-full justify-center items-center gap-2 mb-5">
            {
                SidebarLinks.nav.map((item, index) => ( 
                    item.link ? 
                    (!item.isNew ? <Tooltip
                      position="right"
                      label={item.name}
                      offset={{ mainAxis: 5, crossAxis: 0 }}
                      key={index}
                      opened={isExpanded ? false : undefined}
                      variant="light"
                      withArrow
                    >
                        <Link href={item.url} onClick={() => {setisExpanded(false)}} className={(isActive(item.url) ? 'bg-zinc-500/15 relative ' : 'bg-zinc-500/5 ') + (isExpanded ? ' w-full flex gap-3 items-center bg-zinc-500/5 p-3 rounded-sm text-xs' : 'w-fit flex justify-center items-center bg-zinc-500/5 p-3 rounded-sm')}>
                            {item.icon} {isExpanded && <>&nbsp;{item.name}</>}{isActive(item.url) && <IconPointFilled className="absolute -left-2" size={'14'} />}
                        </Link>
                    </Tooltip> : <ShineBorder
                            className={(isExpanded ? 'w-full ' : 'w-fit ') + " flex flex-col justify-center relative overflow- rounded-lg border bg-transparent md:shadow-xl min-w-0 min-h-0"}
                            color={["#4F4ACC", "#C7ADFF", "#46006A"]} key={index}
                          ><Tooltip
                          position="right"
                          label={item.name}
                          offset={{ mainAxis: 5, crossAxis: 0 }}
                          
                          variant="light"
                          opened={isExpanded ? false : undefined}
                          withArrow
                        >
                            <Link href={item.url} onClick={() => {setisExpanded(false)}} className={(isActive(item.url) ? 'bg-zinc-500/15 relative ' : 'bg-zinc-500/5 ') + (isExpanded ? ' w-full flex gap-3 items-center bg-zinc-500/5 p-3 rounded-sm text-xs' : 'w-fit flex justify-center items-center bg-zinc-500/5 p-3 rounded-sm')}>
                                {item.icon} {isExpanded && <>&nbsp;{item.name}</>}{isActive(item.url) && <IconPointFilled className="absolute -left-2" size={'14'} />}
                            </Link>
                        </Tooltip>
                        <Badge variant="light" color={'yellow'} size="xs" key={index} className={(isExpanded ? ' ' : ' top-[unset] -right-[1.49rem] -rotate-90 hidden ') + " transition-all absolute top-1 scale-75 right-1"}>NEW</Badge>
                    </ShineBorder>) :
                    item.badge && !isExpanded ? 
                    <Divider color={"#ffffff50"} w={'90%'} key={index} /> :
                    item.badge && isExpanded && 
                    <Badge variant="light" color={item.color} size="xs" key={index}>{item.name}</Badge>
                ))
            }
            </div>

            <div className="flex flex-col gap-1">
                <Link href={'https://discord.gg/kxz5KHjjbu'} target="_blank" className="maxTab:hidden focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 text-center flex gap-1 justify-center items-center"><IconBrandDiscordFilled color="white" size={16} /> {isExpanded && 'Discord'}</Link>
                <div className="flex gap-1 maxTab:hidden">
                    <Link href={'https://www.instagram.com/ghostboardapp/'} target="_blank" className="w-full flex justify-center items-center bg-zinc-500/5 p-2 rounded-sm ">
                        <Image src={'/icons/instagram-2.png'} alt="discord" className=" w-[28px] h-auto" />
                    </Link>
                    {isExpanded &&
                    <><Link href={'http://youtube.com/@GHOSTBOARD'} target="_blank" className="w-full flex justify-center items-center bg-zinc-500/5 p-2 rounded-sm ">
                        <Image src={'/icons/youtube.png'} alt="discord" className=" w-[28px] h-auto" />
                    </Link>
                    <Link href={'https://x.com/GhostOptions_'} target="_blank" className="w-full flex justify-center items-center bg-zinc-500/5 p-2 rounded-sm ">
                        <Image src={'/icons/twitter.png'} alt="discord" className=" w-[28px] h-auto" />
                    </Link></>}
                </div>
            </div>
        </div>
    )
}