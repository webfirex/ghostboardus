'use client'
import { Avatar, Menu, MultiSelect, rem, Title, Text, Indicator, SegmentedControl, Image, Badge, Popover, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowsLeftRight, IconBell, IconBellFilled, IconBrightnessUpFilled, IconCrown, IconEye, IconMaximize, IconMessageCircle, IconMoonFilled, IconMoonStars, IconPhoto, IconPower, IconReceiptDollar, IconSearch, IconSettings, IconStar, IconTicket, IconTrash, IconTriangleSquareCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import TopWatchPopup from "../tools/topwatch";
import Link from "next/link";
import { logoutAdminUser, logoutUser } from "@/lib/auth";
import EditUser from "./userData/edit";
import { GetLocalData, SaveLocalData } from "@/lib/localStorage";
import { AdminType } from "@/context/AdminContext";
import EditAdmin from "./adminData/edit";

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
    userData?: AdminType;
    dashTheme: string;
    setDashTheme: React.Dispatch<React.SetStateAction<string>>;
}

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);


export default function AdminDashHeader(props: DashHeaderProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [opened1, { open: open1, close: close1 }] = useDisclosure(false);
    const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

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

            <div className="flex gap-2 w-full justify-end items-center">
                <Avatar variant="light" radius="sm" color="white" size={'45'} className="cursor-pointer maxLargeTab:hidden" onClick={toggleFullscreen}>
                    <IconMaximize size="1.4rem" />
                </Avatar>

                {/* <Menu position="bottom-end" withArrow>

                    <Menu.Target>
                        <Avatar variant="light" radius="sm" color="white" size={'45'} className="cursor-pointer">
                            {props.dashTheme === "gdark" ? <IconMoonStars size="1.4rem" /> : props.dashTheme === "dark" ? <IconMoonFilled size={'16'} /> : <IconBrightnessUpFilled size={'16'} />}
                        </Avatar>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item className={props.dashTheme === "gdark" ? "hidden" : ""} onClick={() => {props.setDashTheme('gdark');SaveLocalData('dashTheme', 'gdark')}} leftSection={<IconMoonStars size={'16'} />}>
                            Ghost Theme
                        </Menu.Item>
                        <Menu.Item className={props.dashTheme === "dark" ? "hidden" : ""} onClick={() => {props.setDashTheme('dark');SaveLocalData('dashTheme', 'dark')}} leftSection={<IconMoonFilled size={'16'} />}>
                            Dark Theme
                        </Menu.Item>
                        <Menu.Item className={props.dashTheme === "light" ? "hidden" : ""} onClick={() => {props.setDashTheme('light');SaveLocalData('dashTheme', 'light')}} leftSection={<IconBrightnessUpFilled size={'16'} />}>
                            Light Theme
                        </Menu.Item>
                    </Menu.Dropdown>

                </Menu> */}
      
                {/* <Indicator className=" cursor-pointer" color="white" radius="lg" offset={7} inline>
                    <Avatar variant="light" radius={'sm'} color="white" size={'45'} >
                        <IconBell size="1.7rem" />
                    </Avatar>
                </Indicator> */}
                
                <Menu position="bottom-end" withArrow>

                    <Menu.Target>
                        {/* <Indicator inline variant="light" label={<IconCrown size={'10'} />} color="yellow" size={17} radius={'100%'}> */}
                            <div className="flex gap-2 cursor-pointer ml-3">
                                <div className="flex flex-col justify-center items-end ">
                                    <Title order={5} className=" text-right">{props.userData?.name || ' '}</Title>

                                    <Badge size="xs" variant="light" color={props.userData?.role === 'owner' ? "yellow" : "white"}>{props.userData?.role === 'owner'  ? <div className="flex gap-1"><IconCrown size={'10'} />{props.userData?.role}</div> : <div className="flex gap-1 opacity-75"><IconTriangleSquareCircle size={'10'} />{props.userData?.role}</div>}
                                    </Badge>
                                </div>
                                <Avatar variant="light" radius="sm" color="violet" size={'45'} />
                            </div>
                        {/* </Indicator> */}
                    </Menu.Target>

                    <Menu.Dropdown miw={'200'}>
                      <Menu.Label>Account</Menu.Label>
                      <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} onClick={open1}>
                        User Settings
                      </Menu.Item>
                    
                      <Menu.Divider />
                    
                      <Menu.Label>Danger zone</Menu.Label>
                      <Menu.Item
                        color="red"
                        onClick={logoutAdminUser}
                        leftSection={<IconPower style={{ width: rem(14), height: rem(14) }} />}
                      >
                        Log Out
                      </Menu.Item>
                    </Menu.Dropdown>

                </Menu>


            </div>

            <Drawer opened={opened1} onClose={close1} title="User Details" position="right" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
              <EditAdmin />
            </Drawer>
            <Drawer opened={opened2} onClose={close2} title="Account Billing" position="right" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
              {/* Drawer content */}
            </Drawer>

        </div>
    )
}