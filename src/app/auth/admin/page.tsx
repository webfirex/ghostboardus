"use client"
import { showNotification, showNotificationProps } from "@/utils/notificationManager";
import { PasswordRequirement, getStrength, passwordRequirements } from "@/utils/tools/strengthChecker";
import { Divider, Image, Input, PasswordInput, Popover, Progress, rem } from "@mantine/core";
import { IconEyeCheck, IconEyeOff, IconLock, IconMail, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
  reveal ? (
    <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  ) : (
    <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  );

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string>('Invalid email or password.');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    const notifyData: showNotificationProps = {
      title: '⚠️ Login Error',
      message: error,
      withClose: false
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);
    
      try {
        const response = await fetch("/api/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
      
        const data = await response.json();
      
        if (!response.ok) {
          setError(data.message || "An error occurred. Please try again.");
          showNotification(notifyData)
          setIsLoading(false);
          return;
        }

        router.push("/admin");
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        showNotification(notifyData);
      } finally {
        setIsLoading(false);
      }
    };
    
    return (
        <div className="flex w-full justify-between items-center flex-col h-screen p-7">
                
            <Image src={'/logo-h-x.png'} w={200} mb={'lg'} />

            <div className="flex flex-col w-full justify-center items-center">

                <h1 className=" text-white text-center text-4xl">Admin <span className=" text-primaryLight">Login</span></h1>

                <form action="" className="w-full max-w-[500px] mt-10 flex flex-col gap-5">

                    <Input.Wrapper size="md" label="E-mail">
                      <Input value={email} onChange={(event) => setEmail(event.currentTarget.value)} required classNames={{ input: 'bg-white/5 border-white/15 text-sm' }} placeholder="Your e-mail" size="lg" radius="md" mt={'7px'} leftSection={<IconMail style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} type="email" />
                    </Input.Wrapper>

                    <PasswordInput
                      label="Password"
                      placeholder="Your password"
                      value={password}
                      onChange={(event) => setPassword(event.currentTarget.value)}
                      size="lg"
                      radius="md"
                      classNames={{ input: 'mt-[7px] bg-white/5 border-white/15 text-sm' }}
                      visibilityToggleIcon={VisibilityToggleIcon}
                      leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                      required
                      withAsterisk={false}
                    />

                    <button type="button" onClick={handleSubmit} className=" mt-5 w-full bg-primary self-center px-5 py-3 rounded-full">
                        Log In
                    </button>

                </form>
            </div>

            <div className="flex w-full justify-center p-3">
            </div>
        </div>
    )
}