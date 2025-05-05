"use client"
import { PasswordRequirement, getStrength, passwordRequirements } from "@/utils/tools/strengthChecker";
import { Divider, Image, Input, PasswordInput, Popover, Progress, rem } from "@mantine/core";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconEyeCheck, IconEyeOff, IconLock, IconMail, IconSquareRoundedX, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { showNotification, showNotificationProps } from "@/utils/notificationManager";

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
  reveal ? (
    <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  ) : (
    <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  );

const loadingStates = [
  {
    text: "Connecting to Servers",
  },
  {
    text: "Setting up your account",
  },
  {
    text: "Setting up your dashboard",
  },
  {
    text: "Welcome to GhostBoard !",
  },
];

export default function SignUp() {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const notifyData: showNotificationProps = {
      title: '⚠️ Signup Error',
      message: error,
      withClose: false
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      setLoading2(true);
  
      if (password !== cPassword) {
        setError('Passwords do not match');
        showNotification({
          title: '⚠️ Signup Error',
          message: 'Passwords do not match',
          withClose: false
        })
        setLoading2(false);
        return;
      }
  
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: userName, email: userEmail.toLowerCase(), password: password }),
        });
  
        if (!res.ok) {
          const error = await res.json()
          setError(error.error || 'Something went wrong');
          if (error.error === 'Email') {
            showNotification({
              title: '⚠️ Signup Error',
              message: 'Email is already in use',
              withClose: false
            })
          } else if (error.error === 'Testing') {
            showNotification({
              title: '⚠️ Signup Error',
              message: 'Beta testing for Ghostboard v2 is enabled only for premium users, Please contact support for access',
              withClose: false
            })
          }
          return;
        }

        const message = await res.json()
        setUserId(message.id)

        setLoading(true)
        setSuccess('Signup successful! You can now log in.');
        setUserEmail('');
        setUserName('');
        setCPassword('')
        setPassword('');
      } catch (err) {
        setError('An unexpected error occurred');
      }
    };

    const checks = passwordRequirements.map((requirement, index) => (
      <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
    ));
  
    const strength = getStrength(password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
    
    return (
        <div className="flex w-full justify-between items-center flex-col h-screen p-7">

            <Loader loadingStates={loadingStates} loading={loading} url={`https://ghostboard.net/auth/thankYou?id=${userId}`} duration={2000} />
                
            <Image src={'/logo-h-x.png'} w={200} mb={'lg'} />

            <div className="flex flex-col w-full justify-center items-center">

                <h1 className=" text-white text-center text-4xl">Start Your <span className=" text-primaryLight">7-Day Free</span> Trial</h1>
                <p className="text-center max-w-[500px] text-xs text-zinc-400 mt-3">Create your GhostBoard account and unlock access to cutting-edge trading tools and analytics. Start your journey today!</p>

                <form className="w-full max-w-[500px] mt-10 flex flex-col gap-5">

                    <Input.Wrapper size="md" label="Name">
                      <Input value={userName} onChange={(event) => setUserName(event.currentTarget.value)} required classNames={{ input: 'bg-white/5 border-white/15 text-sm' }} placeholder="Your name" size="lg" radius="md" mt={'7px'} leftSection={<IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} />
                    </Input.Wrapper>
                    <Input.Wrapper size="md" label="E-mail">
                      <Input value={userEmail} onChange={(event) => setUserEmail(event.currentTarget.value)} required classNames={{ input: 'bg-white/5 border-white/15 text-sm' }} placeholder="Your e-mail" size="lg" radius="md" mt={'7px'} leftSection={<IconMail style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} type="email" />
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

                    <PasswordInput
                      label="Confirm password"
                      placeholder="Confirm password"
                      value={cPassword}
                      onChange={(event) => setCPassword(event.currentTarget.value)}
                      size="lg"
                      radius="md"
                      classNames={{ input: 'mt-[7px] bg-white/5 border-white/15 text-sm' }}
                      visibilityToggleIcon={VisibilityToggleIcon}
                      leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                      required
                      withAsterisk={false}
                    />

                    <button type="button" onClick={handleSubmit} className=" mt-5 w-full bg-primary self-center px-5 py-3 rounded-full">
                        Register
                    </button>

                    {/* <Divider my="xs" label="or" labelPosition="center" w={'70%'} className="self-center" />

                    <button type="button" className=" w- bg-white text-black self-center px-5 py-3 rounded-full flex items-center justify-center gap-3">
                        <Image src={'/icons/google.webp'} w={'35px'} /> Sign up with Google
                    </button> */}

                </form>

            </div>

            <div className="flex w-full justify-center p-3">
                <Link href="login" className="text-center">Already have an account ? <span className="text-primaryLight">Click here to Login</span></Link>
            </div>

        </div>
    )
}