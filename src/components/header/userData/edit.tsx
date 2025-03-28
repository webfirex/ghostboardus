'use client'
import { useUser } from "@/context/UserContext"
import { playAudio } from "@/utils/audioPlayer";
import { formatDateToTz } from "@/utils/formatDate";
import { showDashNotification, showNotificationProps } from "@/utils/notificationManager";
import { getStrength, PasswordRequirement, passwordRequirements } from "@/utils/tools/strengthChecker";
import { ActionIcon, Avatar, Badge, CopyButton, Divider, FileInput, Image, Input, Kbd, List, Loader, PasswordInput, Popover, Progress, rem, Switch, Title, Tooltip } from "@mantine/core";
import { IconBrandDiscordFilled, IconCheck, IconCopy, IconEdit, IconEyeCheck, IconEyeOff, IconImageInPicture, IconLock, IconPhotoScan } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? (
      <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    ) : (
      <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    );

interface EditUserProps {
  isSoundOn: boolean;
  setIsSoundOn: React.Dispatch<React.SetStateAction<boolean>>;
  isANotifOn: boolean;
  setIsANotifOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditUser(props: EditUserProps) {
    const user = useUser();
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [editProfile, setEditProfile] = useState<boolean>(false);
    const [updateBtn, setUpdateBtn] = useState<boolean>(false);
    const [notifyData, setNotifyData] = useState<showNotificationProps> ({
      title: '',
      message: '',
      withClose: false
    })
    
    const checks = passwordRequirements.map((requirement, index) => (
      <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
    ));
  
    const strength = getStrength(password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';


    const resetPass = async (password: string) => {
        setNotifyData((prev) => ({...prev, message: '',}));

        if (cPassword != password) {
          showDashNotification({
            title: 'Incorrect Password',
            message: "Your Initial password and re-entered password don't match",
            withClose: false
          });
          return
        }
      
        try {
          const response = await fetch("/api/resetPassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user?.id, password: password }),
          });
        
          const data = await response.json();
        
          if (!response.ok) {
            showDashNotification({
              title: '',
              message: data.message || "An error occurred. Please try again.",
              withClose: false
            });
            return;
          } else {
            showDashNotification({
              title: 'Password Reset Successfully',
              message: "",
              withClose: false
            });
          }
        } catch (err) {
          showDashNotification({
            title: '',
            message: "An error occurred. Please try again.",
            withClose: false
          });
        } finally {
        }
    };

    const handleUpload = async () => {
      setUpdateBtn(true)
      if (!file || !user?.id) {
        showDashNotification({
          title: 'Error',
          message: "Please select an image file",
          withClose: false
        });
        setUpdateBtn(false)
        return;
      }
    
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", user.id);
    
      try {
        const response = await fetch("/api/imgBB", {
          method: "POST",
          body: formData,
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

    const handleNameUpdate = async () => {
      setUpdateBtn(true)
      if (!name || name === '' || !user?.id) {
        showDashNotification({
          title: 'Error',
          message: "Please enter your name",
          withClose: false
        });
        setUpdateBtn(false)
        return;
      }
    
      try {
        const response = await fetch("/api/nameUpdate", {
          method: "POST",
          body: JSON.stringify({ id: user.id, name: name}),
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
            <div className="w-full flex flex-wrap">
                <Avatar src={user?.pfpic ? user?.pfpic : null} alt="user image" className=" aspect-square w-2/6 maxTab:w-1/2 h-auto" radius={'sm'} />
                <div className="flex flex-col gap-1 p-2 px-4 w-4/6 maxTab:w-1/2">
                    <Title order={2} className="line-clamp-1">{user?.name}</Title>
                    <p className="text-xs">{user?.email}</p>
                    <Divider my={'7px'} />
                    <div className="flex gap-1 items-center">
                        <p className="text-xs">Status :</p>
                        <Badge color={user?.premium ? 'yellow' : 'white'} variant="transparent">{user?.premium ? 'Premium' : 'Free plan'}</Badge>
                    </div>
                    <div className="flex gap-1 items-center">
                        <p className="text-xs">Registered : {user?.created_at ? formatDateToTz(user?.created_at) : ''}</p>
                    </div>
                </div>
            </div>

            <div onClick={() => {setEditProfile(true)}} className="flex gap-2 mt-2">
                <button type="button" className="text-xs text-center flex gap-1 items-center justify-center w-full rounded-md bg-zinc-400/10 py-2">
                    Edit Profile
                    <IconEdit stroke={'1.2'} size={'16px'} />
                </button>
            </div>

            <div className="flex flex-col mt-2 gap-2">
                <Switch
                  defaultChecked
                  color="violet"
                  label="Dashboard Alert Notifications"
                  size="xs"
                  checked={props.isANotifOn}
                  onChange={(event) => props.setIsANotifOn(event.currentTarget.checked)}
                />
                <Switch
                  defaultChecked
                  color="violet"
                  label="Dashboard Sound Effects"
                  size="xs"
                  checked={props.isSoundOn}
                  onChange={(event) => props.setIsSoundOn(event.currentTarget.checked)}
                  onClick={(event) => {event.currentTarget.checked && playAudio('/sounds/alert.mp3')}}
                />
            </div>

            {editProfile && <div className="flex flex-col mt-4">
                <p className="text-lg font-bold">Edit Profile</p>
                <FileInput accept="image/png,image/jpeg" rightSection={<IconPhotoScan size={18} stroke={1.5} />} value={file} onChange={setFile} className="mt-2" placeholder={'Upload Profile Pic'} />
                <Input value={name} onChange={(event) => setName(event.currentTarget.value)} placeholder="Your Name" className="mt-4" />
                <div className="flex gap-1 w-full">
                    <button type="button" disabled={updateBtn} onClick={() => { file && handleUpload(); name != '' && handleNameUpdate() }} className={(updateBtn ? 'opacity-50 ' : !file ? name === '' ? 'opacity-50 ' : ' ' : ' ') + (" mt-4 text-sm text-center flex gap-1 items-center justify-center w-full rounded-md bg-primary py-2")}>
                        {!updateBtn ? 'Update' : <Loader color="rgba(255, 255, 255, 1)" size="xs" />}
                    </button>
                    <button onClick={() => {setEditProfile(false)}} type="button" className="mt-4 text-sm text-center flex gap-1 items-center justify-center w-full rounded-md bg-zinc-400/10 py-2">
                        Cancel
                    </button>
                </div>
            </div>}

            <div className="flex flex-col mt-4">
                <p className="text-lg font-bold">Reset Password</p>
                <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
                  <Popover.Target>
                    <div
                      onFocusCapture={() => setPopoverOpened(true)}
                      onBlurCapture={() => setPopoverOpened(false)}
                    >
                      <PasswordInput
                        // label="Password"
                        placeholder="Your password"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                        size="md"
                        radius="xs"
                        classNames={{ input: 'mt-[7px] bg-white/5 border-white/15 text-sm' }}
                        visibilityToggleIcon={VisibilityToggleIcon}
                        leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                        required
                        withAsterisk={false}
                      />
                    </div>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Progress color={color} value={strength} size={5} mb="xs" />
                    <PasswordRequirement label="Includes at least 6 characters" meets={password.length > 5} />
                    {checks}
                  </Popover.Dropdown>
                </Popover>
                <PasswordInput
                  placeholder="Confirm password"
                  value={cPassword}
                  onChange={(event) => setCPassword(event.currentTarget.value)}
                  size="md"
                  radius="xs"
                  classNames={{ input: 'mt-[7px] bg-white/5 border-white/15 text-sm' }}
                  visibilityToggleIcon={VisibilityToggleIcon}
                  leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                  required
                  withAsterisk={false}
                  className="mt-2"
                />
                <button onClick={() => {resetPass(password)}} type="button" className="mt-4 text-sm text-center flex gap-1 items-center justify-center w-full rounded-md bg-primary py-2">
                    Reset Password
                </button>
            </div>

        </div>
    )
}