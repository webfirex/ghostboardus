'use client'
import { useUser } from "@/context/UserContext"
import { formatDateToTz } from "@/utils/formatDate";
import { showDashNotification, showNotificationProps } from "@/utils/notificationManager";
import { getStrength, PasswordRequirement, passwordRequirements } from "@/utils/tools/strengthChecker";
import { ActionIcon, Avatar, Badge, CopyButton, Divider, FileInput, Image, Input, Kbd, List, Loader, PasswordInput, Popover, Progress, rem, Switch, Title, Tooltip } from "@mantine/core";
import { IconBrandDiscordFilled, IconCheck, IconCopy, IconEdit, IconEyeCheck, IconEyeOff, IconImageInPicture, IconLock, IconPhotoScan } from "@tabler/icons-react";
import Link from "next/link";

export default function LinkDiscord() {
    const user = useUser();
    
    return (
        <div className="flex flex-col w-full h-full py-4 gap-2 -mt-14">

            <div className="flex flex-col mt-4 gap-2">
              <div className="flex gap-2 items-center">
                <Image src={'/icons/discord.png'} alt="" className="size-[25px]" />
                <p className="text-lg font-bold">Link your Discord account</p>
              </div>
              <p className="text-xs text-zinc-400">Link your discord account and unlock access to Premium channels with an active community, amaizng resources and skilled mentors.</p>
              <Divider />
              <List size="xs">
                <List.Item>1. Join GhostBoard discord server</List.Item>
                <List.Item>2. Go to Join Membership channel in Others tab</List.Item>
                <List.Item>3. Run this command :</List.Item>
              </List>
              <div className="flex p-2 gap-2 bg-black w-full px-4 rounded-sm text-base justify-between items-center relative">
                <div className="flex gap-2">
                  /link <Kbd bg={'dark'} bd={'dark'}>{user?.discord_code}</Kbd>
                </div>
                <CopyButton value={user?.discord_code ? user.discord_code : ''} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>

                {/* <div className="flex flex-col w-full h-full absolute z-10 top-0 left-0 backdrop-blur-lg bg-zinc-400/5 rounded-md justify-center items-center">
                    <Badge color="white" variant="light">This feature is under development</Badge>
                </div> */}
              </div>
              <Link href={'https://discord.gg/Q5tGPWpmfT'} target="_blank" className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 text-center flex gap-1 justify-center items-center"><IconBrandDiscordFilled color="white" size={16} />Join Discord</Link>
            </div>
        </div>
    )
}