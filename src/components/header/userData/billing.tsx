'use client'
import { useUser } from "@/context/UserContext"
import { formatDateToTz } from "@/utils/formatDate";
import { showDashNotification, showNotificationProps } from "@/utils/notificationManager";
import { getStrength, PasswordRequirement, passwordRequirements } from "@/utils/tools/strengthChecker";
import { ActionIcon, Avatar, Badge, Button, CopyButton, Divider, FileInput, Image, Input, Kbd, List, Loader, Modal, PasswordInput, Popover, Progress, rem, Switch, Textarea, Title, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandDiscordFilled, IconCheck, IconCopy, IconCrown, IconEdit, IconEyeCheck, IconEyeOff, IconImageInPicture, IconLock, IconPhotoScan, IconTriangleSquareCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function UserBilling() {
    const user = useUser();
    const [opened, { open, close }] = useDisclosure(false);
    const [updateBtn, setUpdateBtn] = useState<boolean>(false);
    const [value, setValue] = useState('');

    const handleCancelSub = async () => {
        setUpdateBtn(true)
        if (!user?.email) {
          showDashNotification({
            title: 'Error',
            message: "Email not found",
            withClose: false
          });
          setUpdateBtn(false)
          return;
        }

        if (value === "") {
          showDashNotification({
            title: 'Error',
            message: "Please enter cancellation reason",
            withClose: false
          });
          setUpdateBtn(false)
          return;
        }
      
        try {
          const response = await fetch("/api/cancelSub", {
            method: "POST",
            body: JSON.stringify({ email: user.email, reason: value}),
          });
      
          const data = await response.json();
  
          if (!data.success) {
            showDashNotification({
              title: 'Error',
              message: data.message || "An error occurred. Please try again.",
              withClose: false
            });
            setUpdateBtn(false)
            return;
          }
      
          showDashNotification({
            title: data.message,
            message: '',
            withClose: false
          });
          setUpdateBtn(false)
        } catch (error) {
          showDashNotification({
            title: 'Error',
            message: "An error occurred. Please try again.",
            withClose: false
          });
          setUpdateBtn(false)
        } finally {
            setUpdateBtn(false)
        }
    };
    
    return (
        <div className="flex flex-col w-full h-full py-4 gap-2 -mt-14">
            <div className="w-full flex flex-col relative rounded-md overflow-hidden">
                <Image className="w-full max-h-[150px] rounded-md" src={user?.premium ? '/bg/premium.jpg' : '/bg/dashGhostbg.jpg'} />
                <div className="absolute bottom-0 left-0 w-full h-[70px] bg-gradient-to-t from-black to-transparent z-0">
                </div>
                <Badge size="xl" variant={"transparent"} mt={'-37px'} mb={'xs'} className="z-10" color={user?.premium ? "yellow" : "white"}>{user?.premium ? <div className="flex gap-1"><IconCrown /> <span className=" maxTab:hidden">Premium</span></div> : <div className="flex gap-1 opacity-75"><IconTriangleSquareCircle /> <span className=" maxTab:hidden">Free Plan</span> </div>}
                </Badge>
            </div>
            <div className="flex flex-col gap-1 p-2 w-full">
                <div className="flex gap-1 items-center">
                    <p className="text-xs">Registered : {user?.created_at ? formatDateToTz(user?.created_at) : ''}</p>
                </div>
                <Divider my={'7px'} />
                <div className="flex flex-col gap-1">
                    <p className="text-xs">Subscription Start : {user?.subdate ? formatDateToTz(user?.subdate) : ''}</p>
                    <p className="text-xs">Subscription End : {user?.expdate ? formatDateToTz(user?.expdate) : ''}</p>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                    <p className="text-xs">Trial Start : {user?.trialdate ? formatDateToTz(user?.trialdate) : ''}</p>
                    <p className="text-xs">Trial End : {user?.trialexpdate ? formatDateToTz(user?.trialexpdate) : ''}</p>
                </div>
            </div>
            {user?.premium && <div className="flex flex-col gap-1 p-2 w-full">
                <Button onClick={open} variant="light" color="#d80000">Cancel Billing</Button>
            </div>}
            <div className="flex flex-col gap-1 p-2 pt-0 w-full">
              <Link href={'mailto:support@ghostboard.net'} className="w-full"><Button variant="light" color="#635BFF" className="w-full">Contact Support</Button></Link>
            </div>
            <Modal opened={opened} centered onClose={close} title="Are you sure, you want to cancel your subscription ?">
                <Textarea
                  value={value}
                  onChange={(event) => setValue(event.currentTarget.value)}
                  placeholder="Please enter cancellation reason ..."
                />
                <div className="flex pt-4 gap-2 w-full">
                    <button type="button" className="w-1/2 rounded-md py-2 bg-primaryDark " onClick={() => {updateBtn || handleCancelSub()}}>{!updateBtn ? 'Cancel' : <Loader color="rgba(255, 255, 255, 1)" size="xs" />}</button>
                    <button type="button" className="w-1/2 rounded-md py-2 bg-zinc-700/10 " onClick={() => {updateBtn || close()}} disabled={updateBtn}>{!updateBtn ? 'Close' : <Loader color="rgba(255, 255, 255, 1)" size="xs" />}</button>
                </div>
            </Modal>
        </div>
    )
}