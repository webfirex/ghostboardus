'use client'
import { AdminSidebar } from "@/data/landing/links"
import { Badge, Divider, Image, MultiSelect, NavLink, Tooltip } from "@mantine/core"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import ShineBorder from "../ui/shine-border"
import { IconBrandDiscordFilled, IconCaretLeftFilled, IconCaretRightFilled, IconPointFilled, IconSearch } from "@tabler/icons-react"
import { useAdmin } from "@/context/AdminContext"

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);

export default function AdminSideBar({ isExpanded, setisExpanded }: { isExpanded: boolean; setisExpanded: React.Dispatch<React.SetStateAction<boolean>> }) {

    const SidebarLinks = AdminSidebar
    const pathname = usePathname()
    const admin = useAdmin();

    function isActive(path: string) {
        if(path === pathname) {return true} else {false}
    }

    return (
        <div className={(isExpanded ? ' min-w-[210px] w-[200px] ' : ' w-[70px] ') + "sm:flex flex-col h-screen hidden justify-between bg-zinc-500/5 min-w-[70px] p-2 transition-all"}>
            <div className="w-full flex justify-center items-center p-3 rounded-sm">
                <button  onClick={() => {!isExpanded ? setisExpanded(true) : setisExpanded(false)}} className="flex justify-center items-center font-bold relative">
                    <Image src={SidebarLinks.logo.image} alt="logo" className="w-[30px]" /> {isExpanded && <>&nbsp;GHOSTBOARD</>}
                    {isExpanded ? <IconCaretLeftFilled className="absolute -right-5" size={'14'} /> : <IconCaretRightFilled className="absolute -right-5" size={'14'} />}
                </button>
            </div>

            <div className="flex flex-col w-full justify-center items-center gap-2 mb-5">
            {
                SidebarLinks.nav.map((item, index) => ( 
                    admin && item.roles.includes(admin.role) && (item.link ? 
                    (!item?.isNew ? <Tooltip
                      position="right"
                      label={item.name}
                      offset={{ mainAxis: 5, crossAxis: 0 }}
                      key={index}
                      opened={isExpanded ? false : undefined}
                      variant="light"
                      withArrow
                    >
                        <Link href={item.url} className={(isActive(item.url) ? 'bg-zinc-500/15 relative ' : 'bg-zinc-500/5 ') + (isExpanded ? ' w-full flex gap-3 items-center bg-zinc-500/5 p-3 rounded-sm text-xs' : 'w-fit flex justify-center items-center bg-zinc-500/5 p-3 rounded-sm')}>
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
                            <Link href={item.url} className={(isActive(item.url) ? 'bg-zinc-500/15 relative ' : 'bg-zinc-500/5 ') + (isExpanded ? ' w-full flex gap-3 items-center bg-zinc-500/5 p-3 rounded-sm text-xs' : 'w-fit flex justify-center items-center bg-zinc-500/5 p-3 rounded-sm')}>
                                {item.icon} {isExpanded && <>&nbsp;{item.name}</>}{isActive(item.url) && <IconPointFilled className="absolute -left-2" size={'14'} />}
                            </Link>
                        </Tooltip>
                        <Badge variant="light" color={'yellow'} size="xs" key={index} className={(isExpanded ? ' ' : ' top-[unset] -right-[1.49rem] -rotate-90 ') + " transition-all absolute top-1 scale-75 right-1"}>NEW</Badge>
                    </ShineBorder>) :
                    item.badge && !isExpanded ? 
                    <Divider color={"#ffffff50"} w={'90%'} key={index} /> :
                    item.badge && isExpanded && 
                    <Badge variant="light" color={item.color} size="xs" key={index}>{item.name}</Badge>)
                ))
            }
            </div>

            <div className="flex flex-col gap-1">
            </div>
        </div>
    )
}