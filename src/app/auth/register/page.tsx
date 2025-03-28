"use client"
import { PasswordRequirement, getStrength, passwordRequirements } from "@/utils/tools/strengthChecker";
import { Divider, Image, Input, PasswordInput, Popover, Progress, Rating, rem } from "@mantine/core";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconEyeCheck, IconEyeOff, IconLock, IconMail, IconSquareRoundedX, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { showNotification, showNotificationProps } from "@/utils/notificationManager";
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer/common";
import Cookies from "js-cookie";
import { Highlight } from "@/components/ui/hero-highlight";
import AvatarCircles from "@/components/ui/avatar-circles";
import { FaqAccordion } from "@/components/home-page/faq/faq";
import FaqSection from "@/components/home-page/faqs";

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

const screenshots = [
  {img: '1.png',},
  {img: '2.png',},
  {img: '3.png',},
  {img: '4.png',},
  {img: '5.png',},
  {img: '6.png',},
  {img: '7.png',},
  {img: '8.png',},
  {img: '9.png',},
  {img: '10.png',},
  {img: '11.png',},
  {img: '12.png',},
  {img: '13.png',},
  {img: '14.png',},
  {img: '15.png',},
  {img: '16.png',}
]

const ProfitCard = ({
img,
}: {
img: string;
}) => {
return (
  <figure
    className={cn(
      "relative cursor-pointer overflow-hidden h-full rounded-xl px-2"
    )}
  >
    <div className="flex flex-row items-center h-full gap-4">
      <Image src={'/profits/' + img } alt="" className="w-auto h-[250px]" radius={"sm"} loading="lazy"  />
    </div>
  </figure>
);
};

function ProfitsMarquee() {
return (
  <div className="relative flex w-full justify-between items-center flex-col overflow-x-hidden min-h-[300px] mt- my-7 z-10 bg-black/10 py-0 backdrop-blur-lg">
    <Marquee pauseOnHover className="[--duration:50s] h-fit">
      {screenshots.map((screenshot) => (
        <ProfitCard key={screenshot.img} {...screenshot} />
      ))}
    </Marquee>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-dark/50"></div>
    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-dark/50"></div>
  </div>
);
}

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "",
  },
];

export default function SignUp() {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const notifyData: showNotificationProps = {
      title: '⚠️ Signup Error',
      message: error,
      withClose: false
    }

    useEffect(() => {
        Cookies.set("reffcode", 'ads', { expires: 7 });
    }, []);

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
        <div className="flex w-full flex-col min-h-screen overflow-y-scroll items-center p-7 px-4">

            <Loader loadingStates={loadingStates} loading={loading} url={'/dashboard?signup=true'} duration={2000} />
                
            <Image src={'/logo-h-x.png'} w={150} mb={'lg'} />

            <div className="flex flex-col w-full justify-center items-center">

              <span className=" select-none pointer-events-none whitespace-pre-wrap bg-gradient-to-br from-white to-zinc-300/80 bg-clip-text text-center text-2xl sm:text-5xl font-semibold leading-10 sm:leading-normal text-white">
                🚨WARNING: <br /> Every second you wait is a missed opportunity!
              </span>

                {/* <p className="text-center max-w-[500px] text-xs text-zinc-400 mt-3">Create your GhostBoard account and unlock access to cutting-edge trading tools and analytics. Start your journey today!</p> */}


                <div className="flex gap-2 flex-col items-center justify-center mt-4 ">
                  <AvatarCircles numPeople={1.5} avatarUrls={avatars} />
                  <div className="flex flex-col items-center gap-1">
                    <Rating defaultValue={5} color="rgba(255, 217, 0, 1)" readOnly />
                    <p className="text-zinc-300 text-xs">More than 1.5k Happy Customers</p>
                  </div>
                </div>

                <video src="https://testapi.webepex.com/videos/ghost-vid.mp4" loop autoPlay controls className="w-full h-auto aspect-video max-w-[700px] mt-7 mb-7 rounded-lg border-2 border-white/40"></video>

                <span className=" select-none pointer-events-none whitespace-pre-wrap bg-gradient-to-br from-white to-zinc-300/80 bg-clip-text text-center text-2xl sm:text-5xl font-semibold leading-10 sm:leading-normal text-white">
                  Start <span className="text-white">7 Day Free Trial</span> Now
                </span>

                <form className="w-full max-w-[500px] mt-4 flex flex-col gap-1 border border-white/50 p-3 rounded-lg">

                    <Input.Wrapper size="md">
                      <Input value={userName} onChange={(event) => setUserName(event.currentTarget.value)} required classNames={{ input: 'bg-white/5 border-white/15 text-sm' }} placeholder="Your name" size="md" radius="md" mt={'7px'} leftSection={<IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} />
                    </Input.Wrapper>
                    <Input.Wrapper size="md">
                      <Input value={userEmail} onChange={(event) => setUserEmail(event.currentTarget.value)} required classNames={{ input: 'bg-white/5 border-white/15 text-sm' }} placeholder="Your e-mail" size="md" radius="md" mt={'7px'} leftSection={<IconMail style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} type="email" />
                    </Input.Wrapper>

                    <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
                      <Popover.Target>
                        <div
                          onFocusCapture={() => setPopoverOpened(true)}
                          onBlurCapture={() => setPopoverOpened(false)}
                        >
                          <PasswordInput
                            placeholder="Your password"
                            value={password}
                            onChange={(event) => {setPassword(event.currentTarget.value); setCPassword(event.currentTarget.value)}}
                            size="md"
                            radius="md"
                            classNames={{ input: 'mt-[7px] bg-white/5 border-white/15 text-sm' }}
                            visibilityToggleIcon={VisibilityToggleIcon}
                            leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                            required
                            withAsterisk={false}
                          />
                        </div>
                      </Popover.Target>
                    </Popover>

                    <button type="button" onClick={handleSubmit} className=" mt-5 w-full bg-primary self-center px-5 py-3 rounded-full">
                        Register Now
                    </button>

                </form>

            </div>

            <span className=" select-none pointer-events-none whitespace-pre-wrap bg-gradient-to-br from-white to-zinc-300/80 bg-clip-text text-center text-2xl sm:text-5xl font-semibold leading-10 sm:leading-normal text-white mt-7">
            💸 1.25k+ Users <br /> Booking Profits Daily ! 👇🏻
            </span>

            <ProfitsMarquee />

            <div className="flex w-full flex-col justify-center items-center">
              <span className=" select-none pointer-events-none whitespace-pre-wrap bg-gradient-to-br from-white to-zinc-300/80 bg-clip-text text-center text-2xl sm:text-5xl font-semibold leading-10 sm:leading-normal text-white mb-7">
              Frequently Asked Questions
              </span>
              <FaqAccordion />
            </div>

            <Footer />

        </div>
    )
}