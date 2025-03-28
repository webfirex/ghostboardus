'use client'
import { useAdmin } from "@/context/AdminContext";
import { useUser } from "@/context/UserContext"
import { formatDateToTz } from "@/utils/formatDate";
import { getStrength, PasswordRequirement, passwordRequirements } from "@/utils/tools/strengthChecker";
import { Avatar, Badge, Divider, FileInput, Input, PasswordInput, Popover, Progress, rem, Switch, Title } from "@mantine/core";
import { IconEdit, IconEyeCheck, IconEyeOff, IconImageInPicture, IconLock, IconPhotoScan } from "@tabler/icons-react";
import { useState } from "react";

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? (
      <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    ) : (
      <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    );

export default function EditAdmin() {
    const user = useAdmin();
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [value, setValue] = useState<File | null>(null);
    const [editProfile, setEditProfile] = useState<boolean>(false);

    const checks = passwordRequirements.map((requirement, index) => (
      <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
    ));
  
    const strength = getStrength(password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
    
    return (
        <div className="flex flex-col w-full h-full py-4 gap-2">
            <div className="w-full flex flex-wrap">
                <Avatar src={null} alt="user image" className=" aspect-square w-2/6 h-auto" radius={'sm'} />
                <div className="flex flex-col gap-1 p-2 px-4 w-4/6">
                    <Title order={2}>{user?.name}</Title>
                    <div className="flex gap-1 items-center">
                        <p className="text-xs">role :</p>
                        <Badge color={user?.role === "owner" ? 'yellow' : 'white'} variant="transparent">{user?.role}</Badge>
                    </div>
                    <div className="flex gap-1 items-center">
                        <p className="text-xs">Registered : {user?.created_at ? formatDateToTz(user?.created_at) : ''}</p>
                    </div>
                    <Divider my={'7px'} />
                    <div onClick={() => {setEditProfile(true)}} className="flex gap-2">
                        <button type="button" className="text-xs text-center flex gap-1 items-center justify-center w-full rounded-md bg-zinc-400/10 py-2">
                            Edit Profile
                            <IconEdit stroke={'1.2'} size={'16px'} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-4 gap-2">
                <Switch
                  defaultChecked
                  color="violet"
                  label="Browser Notifications"
                  size="xs"
                />
                <Switch
                  defaultChecked
                  color="violet"
                  label="Dashboard Sound Effects"
                  size="xs"
                />
            </div>

            {editProfile && <div className="flex flex-col mt-4">
                <p className="text-lg font-bold">Edit Profile</p>
                <Input placeholder="Your Name" className="mt-4" />
                <div className="flex gap-1 w-full">
                    <button type="button" className="mt-4 text-sm text-center flex gap-1 items-center justify-center w-full rounded-md bg-primary py-2">
                        Update
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
                <button type="button" className="mt-4 text-sm text-center flex gap-1 items-center justify-center w-full rounded-md bg-primary py-2">
                    Reset Password
                </button>
            </div>
        </div>
    )
}