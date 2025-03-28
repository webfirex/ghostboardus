'use client'
import { Avatar, Badge, Indicator, Skeleton, Title } from "@mantine/core";
import { IconBell, IconBrandDiscordFilled, IconBrandYoutubeFilled, IconCast, IconDeviceTv, IconFilterFilled, IconLockFilled, IconTriangleFilled, IconTriangleInvertedFilled } from "@tabler/icons-react";
import StreamAlerts from "./alerts";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import ReactPlayer from "react-player";
import { useToolsData } from "@/context/ToolsContext";
import NotPremiumOverlay from "@/components/ui/notPremiumOverlay";

interface LiveStreamProps {
    alerts: any[]
}

export default function LiveStream (props: LiveStreamProps) {
    const [displayStream, setDisplayStream] = useState(true)
    const [stream, setStream] = useState(false)
    const user = useUser();
    const toolsData = useToolsData();

    useEffect(() => {
        if (toolsData?.streams?.cnbc) {
            setStream(true)
        } else if (user?.email === 'prakhar@webepex.com') {
            setStream(true)
        } else {
            setStream(false)
        }

    }, [user, toolsData]);

    return (
        <div className="flex w-full flex-col rounded-lg gap-2">
            <div className="flex flex-col w-full p-2 rounded-md bg-zinc-400/5 gap-2 transition-all">

                <button className="flex w-full justify-between items-center cursor-pointer" type="button" onClick={() => {displayStream ? setDisplayStream(false) : setDisplayStream(true)}}>

                    <div className="flex gap-5 items-start">
                        <Badge size="lg" p={10} color="white" variant="light">
                            <div className="flex gap-2 items-center"><IconDeviceTv size={'15px'} />Live Stream</div>
                        </Badge>
                        <Indicator className=" cursor-pointer" color="red" radius="lg" offset={7} inline processing mt={5}>
                            <Avatar variant="light" radius={'sm'} color="white" size={'0'} className="hidden" >
                            </Avatar>
                        </Indicator>
                    </div>

                    {!displayStream ? <IconTriangleInvertedFilled size={'10'} /> : <IconTriangleFilled size={'10'} />}

                    {/* {!stream && <IconLockFilled size={'10'} />} */}
                </button>

                {
                    displayStream && 
                    <div className="flex w-full flex-col py-2 border-t border-white/10 overflow-y-scroll gap-2 relative">

                        <div className="flex flex-col w-full gap-1">
                            {/* <p className="text-[10px] text-zinc-400">Switch Stream</p> */}
                            <div className="flex gap-1">
                                <Badge variant="filled" color="orange" p={10} size="md" className=" cursor-pointer">
                                    <div className="flex gap-2 items-center">
                                        <IconCast size={15} /> Cnbc
                                    </div>
                                </Badge>
                                <Badge variant="transparent" color="white" p={10} opacity={0.5} size="md" className=" ">
                                    <div className="flex gap-2 items-center">
                                        <IconBrandYoutubeFilled size={15} /> Youtube
                                    </div>
                                </Badge>
                                <Badge variant="transparent" opacity={0.5} color="white" p={10} size="md" className=" ">
                                    <div className="flex gap-2 items-center">
                                        <IconBrandDiscordFilled size={15} /> Discord
                                    </div>
                                </Badge>
                            </div>
                        </div>
                        { user ? <div className="flex w-full aspect-video overflow-hidden rounded-md relative">

                            {user.premium && !stream && <div className="flex flex-col w-full h-full absolute z-10 top-0 left-0 backdrop-blur-lg bg-zinc-400/5 rounded-md justify-center items-center">
                                <Badge color="white" variant="light">No Live Stream Right Now</Badge>
                            </div>}

                            {user.premium && !stream && <iframe width="100%" height="" src="https://www.youtube.com/embed/1tn1xmZxsoU?si=UQNJNxiQVT0eMEmz" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                            {!user.premium && <NotPremiumOverlay />}

                            {!user.premium && <iframe width="100%" height="" src="https://www.youtube.com/embed/1tn1xmZxsoU?si=UQNJNxiQVT0eMEmz" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                            {user.premium && stream && <ReactPlayer
                              url="https://stream.ghostboard.net/hls/stream.m3u8"
                              playing
                              controls
                              width="100%"
                              height="100%"
                              muted
                            />}

                        </div> : <Skeleton radius="md" className="rounded-md w-full justify-between items-center aspect-video opacity-5" />}
                    </div>
                }

            </div>
            
            <StreamAlerts alerts={props.alerts} />
        </div>
    )
}