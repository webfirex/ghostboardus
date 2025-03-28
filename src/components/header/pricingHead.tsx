'use client'
import { Avatar, Menu, MultiSelect, rem, Title, Text, Indicator, SegmentedControl, Image, Badge, Popover, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowsLeftRight, IconBell, IconBellFilled, IconBrightnessUpFilled, IconCrown, IconEye, IconMaximize, IconMessageCircle, IconMoonFilled, IconMoonStars, IconPhoto, IconPower, IconReceiptDollar, IconSearch, IconSettings, IconStar, IconTicket, IconTrash, IconTriangleSquareCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import TopWatchPopup from "../tools/topwatch";
import Link from "next/link";
import { logoutUser } from "@/lib/auth";
import EditUser from "./userData/edit";
import { GetLocalData, SaveLocalData } from "@/lib/localStorage";
import { useUser } from "@/context/UserContext";

type userData = {
    id: string;
    name: string | null;
    email: string | null;
    pfpic: string | null;
    created_at: string;
    status: boolean;
    premium: boolean;
    subdate: string | null;
    expdate: string | null;
    notifications: object | null;
    email_stat: boolean;
} | null

interface DashHeaderProps {
    userData?: userData;
    dashTheme: string;
    setDashTheme: React.Dispatch<React.SetStateAction<string>>;
}

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);


export default function PriceHeader(props: DashHeaderProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [opened1, { open: open1, close: close1 }] = useDisclosure(false);
    const [opened2, { open: open2, close: close2 }] = useDisclosure(false);
    const user = useUser()

    useEffect(() => {
        props.setDashTheme(GetLocalData('dashTheme') || 'gdark')
    },[])

    const toggleFullscreen = async () => {
        if (!isFullscreen) {
            try {
                await document.documentElement.requestFullscreen();
                setIsFullscreen(true);
            } catch (error) {
                console.error('Failed to enter fullscreen:', error);
            }
        } else {
            try {
                await document.exitFullscreen();
                setIsFullscreen(false);
            } catch (error) {
                console.error('Failed to exit fullscreen:', error);
            }
        }
    };
    
    return (
        <div className="flex w-full items-center justify-between bg-zinc-500/5 h-[77px] px-4">
            
            <div className="flex gap-3 items-center h-full w-fit justify-start">

                <Link href={user ? '/dashboard' : '/'} >
                    <Image src={'/logo-f-t.png'} alt="logo" className="w-[30px]" />
                </Link>

            </div>

            <div className="flex gap-2 w-full justify-end items-center">
                
                {user ? <Menu position="bottom-end" withArrow>

                    <Menu.Target>
                        {/* <Indicator inline variant="light" label={<IconCrown size={'10'} />} color="yellow" size={17} radius={'100%'}> */}
                            <div className="flex gap-2 cursor-pointer ml-3">
                                <div className="flex flex-col justify-center items-end ">
                                    <Title order={5} className=" text-right">{props.userData?.name || ' '}</Title>
                                    {/* <p className="text-zinc-500 text-right text-xs">johndoe@gmail.com</p> */}
                                    <Badge size="xs" variant="light" color={props.userData?.premium ? "yellow" : "white"}>{props.userData?.premium ? <div className="flex gap-1"><IconCrown size={'10'} />Premium</div> : <div className="flex gap-1 opacity-75"><IconTriangleSquareCircle size={'10'} />Free Plan</div>}
                                    </Badge>
                                </div>
                                <Avatar src={user?.pfpic} variant="light" radius="sm" color="violet" size={'45'} />
                            </div>
                        {/* </Indicator> */}
                    </Menu.Target>

                    <Menu.Dropdown miw={'200'}>
                      <Menu.Label>Account</Menu.Label>
                      <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} onClick={open1}>
                        User Settings
                      </Menu.Item>
                      <Menu.Item leftSection={<IconReceiptDollar style={{ width: rem(14), height: rem(14) }} />} onClick={open2}>
                        Account Billing
                      </Menu.Item>
                      <Menu.Item leftSection={<IconTicket style={{ width: rem(14), height: rem(14) }} />}>
                        Support
                      </Menu.Item>
                    
                      <Menu.Divider />
                    
                      <Menu.Label>Danger zone</Menu.Label>
                      <Menu.Item
                        color="red"
                        onClick={logoutUser}
                        leftSection={<IconPower style={{ width: rem(14), height: rem(14) }} />}
                      >
                        Log Out
                      </Menu.Item>
                    </Menu.Dropdown>

                </Menu> : <Link href={'/auth/signup'} className="inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#4F4ACC,45%,#8c86ff,55%,#4F4ACC)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  Sign Up
                </Link>}

            </div>

            {/* <Drawer opened={opened1} onClose={close1} title="User Details" position="right" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
              <EditUser />
            </Drawer> */}
            <Drawer opened={opened2} onClose={close2} title="Account Billing" position="right" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
              {/* Drawer content */}
            </Drawer>

        </div>
    )
}