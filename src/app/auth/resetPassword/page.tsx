"use client"
import { showNotification, showNotificationProps } from "@/utils/notificationManager";
import { PasswordRequirement, getStrength, passwordRequirements } from "@/utils/tools/strengthChecker";
import { Divider, Image, Input, PasswordInput, PinInput, Popover, Progress, rem } from "@mantine/core";
import { IconEyeCheck, IconEyeOff, IconLock, IconMail, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [otpin, setOTPin] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [secemail, setsecEmail] = useState('');
    const [otp, setOtp] = useState<string>("");
    const [otpsent, setotpsent] = useState(false);
    
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [timerExpired, setTimerExpired] = useState(false);

    const startTimer = () => {
        setTimeLeft(30); // Start countdown from 30
        setTimerExpired(false);

        const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime && prevTime > 1) {
                    return prevTime - 1;
                } else {
                    clearInterval(timerInterval);
                    setTimerExpired(true);
                    return 0;
                }
            });
        }, 1000);
    };

    const generateOtp = (): Promise<string> => {
        return new Promise((resolve) => {
            const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
            setOtp(randomOtp);
            resolve(randomOtp);
        });
    };

    const [error, setError] = useState<string>('Invalid email or password.');
    const [isLoading, setIsLoading] = useState(false);
    const [Loading, setLoading] = useState(false);
    const router = useRouter();

    const notifyData: showNotificationProps = {
      title: '⚠️ Password Reset Error',
      message: error,
      withClose: false
    }
    
    const handleSubmit = async () => {
      setError('');
      setIsLoading(true);
      setotpsent(false)

      try {
        const newOTP = await generateOtp();

        setsecEmail(email);

        const response = await fetch("/api/resetpass", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, otp: newOTP}),
        });
      
        const data = await response.json();
      
        if (!response.ok) {
          setError(data.error || "An error occurred. Please try again.");
          if (data.error === 'Invalid') {
            setIsLoading(false);
            showNotification({
              title: '⚠️ Password Reset Error',
              message: 'No user found with this email',
              withClose: false
            })
          } else if (data.message === 'Email') {
            setIsLoading(false);
            showNotification({
              title: '⚠️ Login Error',
              message: 'Your account is inactive / Banned. Please contact support.',
              withClose: false
            })
          } else {
            setIsLoading(false);
            showNotification({
              title: '⚠️ Password Reset Error',
              message: 'Error sending email',
              withClose: false
            })
          }
          setIsLoading(false);
          return;
        }

        setotpsent(true)
        showNotification({
          title: 'OTP sent successfully',
          message: '',
          withClose: false
        })
        startTimer();
        // router.push("/dashboard");
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        showNotification(notifyData);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    const verifyOtp = async () => {
      setError('');
      setLoading(true);

      if (otp != otpin) {
        setLoading(false);
        showNotification({
          title: '⚠️ Incorrect OTP !',
          message: '',
          withClose: false
        })
        return;
      }

      try {

        const response = await fetch("/api/resetlogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: secemail}),
        });
      
        const data = await response.json();
      
        if (!response.ok) {
          setError(data.error || "An error occurred. Please try again.");
          showNotification({
            title: '⚠️ Password Reset Error',
            message: 'Error occoured while logging you in !',
            withClose: false
          })
          setLoading(false);
          return;
        }

        showNotification({
          title: 'Logged in successfully',
          message: '',
          withClose: false
        })
        router.push("/dashboard?resetOtp=true");
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        showNotification(notifyData);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    
    return (
        <div className="flex w-full justify-between items-center flex-col h-screen p-7">
                
            <Image src={'/logo-h-x.png'} w={200} mb={'lg'} />

            <div className="flex flex-col w-full justify-center items-center">

                <h1 className=" text-white text-center text-4xl">Reset <span className=" text-primaryLight">Password</span> !</h1>

                <form action="" className="w-full max-w-[500px] mt-10 flex flex-col gap-5">

                    <Input.Wrapper size="md" label="E-mail">
                      <Input value={email} onChange={(event) => setEmail(event.currentTarget.value.toLocaleLowerCase())} required classNames={{ input: 'bg-white/5 border-white/15 text-sm' }} placeholder="Your e-mail" size="lg" radius="md" mt={'7px'} leftSection={<IconMail style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} type="email" />
                    </Input.Wrapper>

                    <p>Enter the OTP sent to your e-mail</p>
                    
                    <PinInput size="md" value={otpin} onChange={setOTPin} oneTimeCode classNames={{ input: 'bg-white/5 border-white/15 text-sm' }} mt={'-14px'} />

                    {!otpsent ? <button type="button" onClick={handleSubmit} className=" mt-5 w-full bg-primary self-center px-5 py-3 rounded-full">
                       {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button> : Loading ? <button type="button" onClick={verifyOtp} className=" mt-5 w-full bg-primary self-center px-5 py-3 rounded-full">
                       {'Verifying OTP...'}
                    </button> : <button type="button" onClick={verifyOtp} className=" mt-5 w-full bg-primary self-center px-5 py-3 rounded-full">
                       {'Verify OTP'}
                    </button>}

                    {
                      otpsent ? timerExpired ? <button type="button" onClick={handleSubmit} className="text-primaryLight"> Resend OTP </button> : <button type="button" disabled className="text-primaryLight opacity-75"> Resend OTP in {timeLeft} seconds </button> : null
                    }

                </form>
            </div>

            <div className="flex w-full justify-center p-3">
                <Link href="signup" className="text-center">Don&apos;t have an account ? <span className="text-primaryLight">Click here to Register</span></Link>
            </div>
        </div>
    )
}