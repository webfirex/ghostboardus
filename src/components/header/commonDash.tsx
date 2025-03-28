'use client'
import { Avatar, Menu, MultiSelect, rem, Title, Text, Indicator, SegmentedControl, Image, Badge, Popover, Drawer, Modal, ComboboxItem, Select, Input, MenuLabel, MenuItem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowsLeftRight, IconBell, IconBellFilled, IconBrandDiscord, IconBrightnessUpFilled, IconCrown, IconEye, IconMaximize, IconMessageCircle, IconMoonFilled, IconMoonStars, IconNews, IconPhoto, IconPower, IconReceiptDollar, IconSearch, IconSettings, IconStar, IconTicket, IconTrash, IconTriangleSquareCircle, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { logoutUser } from "@/lib/auth";
import EditUser from "./userData/edit";
import { GetLocalData, SaveLocalData } from "@/lib/localStorage";
import { useUser } from "@/context/UserContext";
import TopWatchModal from "../tools/topwatch";
import UserBilling from "./userData/billing";
import LiveStream from "../tools/liveStream/liveStream";
import NewsModule from "../tools/news/news";
import LinkDiscord from "./userData/link";
import StockImage from "../dashboard/stockImage";
import { Carousel } from "@mantine/carousel";

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
    isExpanded: boolean; 
    setisExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    alerts: any[];
    isSoundOn: boolean;
    setIsSoundOn: React.Dispatch<React.SetStateAction<boolean>>;
    isANotifOn: boolean;
    setIsANotifOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const renderCustomItem = ({ option }: { option: { value: string; label: string } }) => (
    <Link href={`/dashboard/stockSearch/${option.value}`} key={option.value} className="flex items-center gap-4 p-1">
      <StockImage symbol={option.value} />
      <span>{option.label}</span>
    </Link>
);

export default function DashHeader(props: DashHeaderProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [opened1, { open: open1, close: close1 }] = useDisclosure(false);
    const [opened2, { open: open2, close: close2 }] = useDisclosure(false);
    const [opened3, { open: open3, close: close3 }] = useDisclosure(false);
    const [opened4, { open: open4, close: close4 }] = useDisclosure(false);
    const [opened5, { open: open5, close: close5 }] = useDisclosure(false);
    const [openedx, { close: closePopup, open: openPopup }] = useDisclosure(false);
    const user = useUser()
    const [value, setValue] = useState<string>('');

    const [data, setData] = useState<string[]>([
        "UPS",
        "SNOW", 
        "AAPL",
        "COIN",
        "META",
        "AMD",
        "NFLX",
        "SPY",
        "QQQ",
        "HOOD",
        "NVDA",
        "GOOGL",
        "SNAP",
        "DIS",
    ]);

    useEffect(() => {
        props.setDashTheme(GetLocalData('dashTheme') || 'gdark')
    },[])

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        if (searchParams.get('resetOtp') === 'true') {
          open1();
        }
    }, [open1]);

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

    const fetchData = async () => {
      try {
        const data = await fetch("/api/fetchStocks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ symbol: value, page: 1, limit: 10 }),
        });
        const result = await data.json();
        const rawData = result.data.map((item: any) => item.symbol)
        setData(rawData);
      } catch (error) {
        console.error("Error fetching indicator:", error);
      } 
    };

    useEffect(() => {
        fetchData();
      }, [value]);
    
    return (
        <div className="flex w-full items-center justify-between bg-zinc-500/5 h-[77px] px-4">
            
            <div className="flex gap-3 items-center h-full  justify-start ">

                <button type="button" onClick={() => {props.setisExpanded(true)}} className="block sm:hidden">
                    <Image src={'/logo-f-t.png'} alt="logo" className="w-[30px]" />
                </button>

                <div className=" maxTab:hidden block h-full ">
                    {user?.premium && <TopWatchModal />}
                </div>

            </div>

            <div className="flex gap-2 w-full h-full justify-end items-center">

                <div className=" hidden maxTab:block h-full items-center">
                    {user?.premium && <TopWatchModal />}
                </div>

                {user && !props.userData?.premium && <Badge color="yellow" variant="outline" onClick={open} className=" cursor-pointer">Guide</Badge>}

                {user && !props.userData?.premium && <Link href={'/pricing'} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#4F4ACC,45%,#8c86ff,55%,#4F4ACC)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 maxTab:text-xs">
                  Free Trial
                </Link>}
      
                {/* <Select
                  placeholder="Search Stocks"
                  className=" maxLargeTab:hidden"
                  data={data}
                  limit={10}
                  maw={'350'}
                  w={'100%'}
                  value={value}
                  onChange={setValue}
                  size="md"
                  searchable
                  maxDropdownHeight={170}
                  rightSectionPointerEvents="none"
                  rightSection={<IconSearch size={'16'}
                   />}
                   renderOption={renderCustomItem}
                /> */}


                {/* <Popover position="bottom-start" withArrow shadow="md" opened={openedx} offset={5}>

                <Popover.Target>
                    <Input
                      placeholder="Stock Search"
                      value={value}
                      onChange={(event) => setValue(event.currentTarget.value.toUpperCase())}
                      onFocus={openPopup}
                      onBlur={closePopup}
                      rightSection={value !== '' ? <IconX onClick={() => setValue('')} /> : <IconSearch stroke={'1.5'} size={'15'} />}
                      maw={'210px'}
                      size="md"
                      className=" maxTab:hidden"
                      rightSectionPointerEvents="auto"
                    />
                </Popover.Target>

                <Popover.Dropdown miw={'210'} p={0}>
                  <p className="text-zinc-500 text-[12px] p-3 pb-1">Search results :</p>
                  {
                    data.map((e, index) => (
                        <Link href={`/dashboard/stockSearch/${e}`} className="flex gap-2 py-2 rounded-md hover:bg-zinc-900 mx-1 px-2" key={index}>
                            <StockImage symbol={e} />
                            <p className="text-zinc-200 text-sm">
                                {e}
                            </p>
                        </Link>
                    ))
                  }
                </Popover.Dropdown>
                
                </Popover> */}

                {user?.premium && <Avatar variant="light" radius="sm" color="white" size={'45'} className="cursor-pointer hidden maxMiniLap:block" onClick={open3}>
                    <IconNews size="1.4rem" />
                </Avatar>}

                <Avatar variant="light" radius="sm" color="white" size={'45'} className="cursor-pointer maxLargeTab:hidden" onClick={toggleFullscreen}>
                    <IconMaximize size="1.4rem" />
                </Avatar>

                <div className="h-full maxTab:hidden items-center flex">
                    <Menu position="bottom-end" withArrow>

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
                        </Menu.Dropdown>

                    </Menu>
                </div>
      
                {/* <Indicator className=" cursor-pointer" color="white" radius="lg" offset={7} inline>
                    <Avatar variant="light" radius={'sm'} color="white" size={'45'} >
                        <IconBell size="1.7rem" />
                    </Avatar>
                </Indicator> */}
                
                <Menu position="bottom-end" withArrow>

                    <Menu.Target>
                        {/* <Indicator inline variant="light" label={<IconCrown size={'10'} />} color="yellow" size={17} radius={'100%'}> */}
                            <div className="flex gap-2 cursor-pointer ml-3 relative maxTab:ml-0">
                                <div className="flex flex-col justify-center items-end maxTab:absolute maxTab:-top-3 maxTab:right-[-15px] z-50">
                                    <Title order={5} className=" text-right maxTab:hidden">{props.userData?.name || ' '}</Title>
                                    {/* <p className="text-zinc-500 text-right text-xs">johndoe@gmail.com</p> */}
                                    {user && user.premium && <Badge size="xs" variant="light" color={"yellow"}><div className="flex gap-1"><IconCrown size={'10'} /> <span className=" maxTab:hidden">Premium</span></div></Badge>}
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
                      <Menu.Item leftSection={<IconBrandDiscord style={{ width: rem(14), height: rem(14) }} />} onClick={open4}>
                        Link Discord
                      </Menu.Item>
                      <Menu.Item leftSection={<IconTicket style={{ width: rem(14), height: rem(14) }} />} onClick={open5}>
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

                </Menu>


            </div>

            { opened5 && <button onClick={close5} type="button" className="absolute top-2 right-2 z-[1000] bg-zinc-900 flex justify-center items-center p-2 rounded-xs"><IconX size={'17px'} /></button>}

            { opened && <button onClick={close} type="button" className="absolute top-2 right-2 z-[1000] bg-zinc-900 flex justify-center items-center p-2 rounded-xs"><IconX size={'17px'} /></button>}

            <Modal opened={opened5} onClose={close5} centered withCloseButton={false} overlayProps={{
              backgroundOpacity: 0.55,
              blur: 3,
            }} className="relative !overflow-visible">
                <Title order={3} ta={"center"}>Welcome to Ghostboard v2! 🎉</Title>
                <p className="text-base mt-4 ">Need assistance? We&apos;re here to help!</p>
                <p className="text-sm text-zinc-400 mt-2">Existing subscription not synced? If you had an active subscription on V1 and it&apos;s not reflected after registering, please email us at <a href="mailto:support@ghostboard.net" target="_blank" className="text-white">support@ghostboard.net</a> for assistance.</p>
                <p className="text-sm text-zinc-400 mt-2"><a href="https://www.youtube.com/@GHOSTBOARD" target="_blank" className="text-white">Tutorials:</a> Visit our Youtube for recorded walkthroughs.</p>
                <p className="text-sm text-white mt-2">Still have questions? Feel free to reach out. We&apos;re happy to support you!</p>
            </Modal>

            <Modal opened={opened} onClose={close} size={'xl'} className="w-fit" centered withCloseButton={false} overlayProps={{
              backgroundOpacity: 0.55,
              blur: 5,
            }}>
                {/* <Title order={3} ta={"center"}>Welcome to GhostBoard!</Title> */}
                <Carousel slideGap="xs" align="start" controlSize={12}>
                  <Carousel.Slide>
                    <Image className="rounded-lg" src={'/slides/1.png'} />
                  </Carousel.Slide>
                  <Carousel.Slide>
                    <Image className="rounded-lg" src={'/slides/2.png'} />
                  </Carousel.Slide>
                  <Carousel.Slide>
                    <Image className="rounded-lg" src={'/slides/4.png'} />
                  </Carousel.Slide>
                  <Carousel.Slide>
                    <Image className="rounded-lg" src={'/slides/5.png'} />
                  </Carousel.Slide>
                  <Carousel.Slide>
                    <Image className="rounded-lg" src={'/slides/6.png'} />
                  </Carousel.Slide>
                </Carousel>
                <div className="flex w-full justify-center my-4">
                    <p className="text-xs text-zinc-400 text-center max-w-[450px]"> <span className="text-white pb-2 ">Welcome to GhostBoard! 🚀</span> <br />Get ready to supercharge your stock options trading with AI-powered insights and advanced analytical tools. Say goodbye to guesswork and hello to smarter, data-driven decisions. Dive in, explore, and take your trading to the next level!</p>
                </div>
                <Link href={'/pricing'} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#4F4ACC,45%,#8c86ff,55%,#4F4ACC)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 maxTab:text-xs mt-3 w-full mx-lg">
                  Free Trial
                </Link>
            </Modal>

            <Drawer opened={opened1} onClose={close1} position="right" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
              <EditUser isANotifOn={props.isANotifOn} isSoundOn={props.isSoundOn} setIsSoundOn={props.setIsSoundOn} setIsANotifOn={props.setIsANotifOn} />
            </Drawer>
            <Drawer opened={opened2} onClose={close2} position="right" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
              <UserBilling />
            </Drawer>
            <Drawer opened={opened4} onClose={close4} position="right" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
              <LinkDiscord />
            </Drawer>
            <Drawer opened={opened3} onClose={close3} withCloseButton={true} position="right" p={'0'} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
                <div className="flex flex-col w-full bg-zinc-400/0 h-full pt-4 overflow-y-scroll gap-2 -mt-5">
                  <LiveStream alerts={props.alerts} />
                  <NewsModule />
                </div>
            </Drawer>

        </div>
    )
}