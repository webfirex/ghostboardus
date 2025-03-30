'use client'
import AuthCarousel from "@/components/auth/carousel";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { checkAuth } from "@/lib/auth";
import { Dialog, Image, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [authCheck, setAuthCheck] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    // const [opened, { toggle, close }] = useDisclosure(true);

    // useEffect(() => {
    //   const verifyAuth = async () => {
    //     const response = await checkAuth();
  
    //     if (response.isAuthenticated) {
    //       router.push("/dashboard");
    //     } else {
    //       setAuthCheck(false)
    //     }
    //   };
  
    //   if (pathname != '/auth/admin' && pathname != '/auth/register') { verifyAuth(); }
    // }, []);
    
    return (
        <div className="flex w-full min-h-screen justify-center items-center relative">
            {pathname != '/auth/admin' && pathname != '/auth/register' && <div className="sm:flex w-full h-full sm:w-1/2 hidden flex-col sm:p-7">
              <div className="flex flex-col w-full h-full sm:rounded-2xl bg-[url(/bg/authBg.jpg)] px-7">
                <div className="flex flex-col w-full h-full justify-start px-7 py-14">
                  <h1 className="text-4xl mb-10">Elevate Your Trading Game</h1>

                  <div className="flex w-full gap-2 mb-10">
                    <IconCircleCheckFilled size={30} />
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-2xl italic">Unmatched Insights</p>
                      <p className="text-sm text-zinc-400">Access real-time analytics and cutting-edge tools to elevate your trading strategies</p>
                    </div>
                  </div>
                  <div className="flex w-full gap-2 mb-10">
                    <IconCircleCheckFilled size={30} />
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-2xl italic">Stay Ahead</p>
                      <p className="text-sm text-zinc-400">Get daily updates, live market trends, and exclusive features to make informed decisions every time</p>
                    </div>
                  </div>
                  <div className="flex w-full gap-2 mb-10">
                    <IconCircleCheckFilled size={30} />
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-2xl italic">Built for Traders</p>
                      <p className="text-sm text-zinc-400">Designed by experts, GhostBoard simplifies trading complexities for beginners and pros alike</p>
                    </div>
                  </div>

                </div>
                <div className="flex flex-col w-full justify-end">
                  <Image src={'/demodash.png'} className=" rounded-t-xl w-full shadow-xl shadow-black/50" />
                </div>
              </div>
            </div>}
            <div className={ (pathname === '/auth/register' ? " sm:w-full " : " sm:w-1/2 ") + " flex w-full flex-col h-full"}>{children}</div>
            {pathname != '/auth/register' && <ShootingStars />}
            {/* <Dialog opened={opened} withCloseButton onClose={close} position={{bottom: 25, left: 25 }} size="xl" radius="md" transitionProps={{transition: 'pop-bottom-left', duration: 200}} className=" maxTab:hidden ">
              <Text size="lg" mb="xs" fw={500}>
                Already a Premium user ?
              </Text>
              <div className="flex w-full">
                <Text size="sm" fw={500} className="text-zinc-400">
                  Please Sign-Up again using the same email to sync your membership
                </Text>
                <Link href={'/auth/signup'} className=" bg-[#4F4ACC] text-nowrap text-white rounded-sm py-2 px-6">Sign Up</Link>
              </div>
            </Dialog> */}
        </div>
    );
}