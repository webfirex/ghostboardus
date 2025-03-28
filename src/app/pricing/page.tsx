'use client'
import FlickerBg from "@/components/effects/flicker";
import { Badge, Flex, MantineProvider } from "@mantine/core";
import StocksMarquee from "@/components/tools/stocksMarquee";
import { Notifications } from "@mantine/notifications";
import { UserProvider, UserType } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { checkAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import PriceHeader from "@/components/header/pricingHead";
import Footer from "@/components/footer/common";
import BottomFade from "@/components/animations/bottomFade";
import SquishyCard from "@/components/ui/squishyCards";

export default function PricingPage() {
    const [user, setUser] = useState<UserType>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [dashTheme, setDashTheme] = useState('gdark');
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {

        const verifyAuth = async () => {
          const response = await checkAuth();
        
          if (!response.isAuthenticated) {
            // router.push("/auth/login");
          } else {
            setUser(response.user);
          }
        };
      
        verifyAuth();
  
        const intervalId = setInterval(verifyAuth, 10000);
        
        return () => clearInterval(intervalId); 
  
    }, [router]);
  
    useEffect(() => {
        if (!user?.id) {
          console.error('User ID is required.');
          return;
        }
    
        const ws = new WebSocket('wss://ws.ghostboard.net');
    
        let pingInterval: any = null;
    
        ws.onopen = () => {
          console.log('WebSocket connected');
          setIsConnected(true);
          ws.send(
            JSON.stringify({
              userId: user?.id,
              modules: [],
            })
          );
    
          // Periodic "ping" messages
          pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'ping' }));
            }
          }, 10000);
        };
    
        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            console.log('Received data:', message);
            setData(message);
          } catch (err) {
            console.error('Error parsing WebSocket message:', err);
          }
        };
    
        ws.onclose = () => {
          console.log('WebSocket disconnected');
          setIsConnected(false);
          clearInterval(pingInterval);
        };
    
        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setIsConnected(false);
        };
    
        return () => {
          ws.close();
          clearInterval(pingInterval);
        };
    }, [user?.id]);
    
    return (
        <UserProvider value={user}>
          <MantineProvider>
            <Notifications position={'bottom-right'} limit={3} className=" scale-5" />
            <div className={"flex flex-col transition-all w-full items-center dashGhostBg relative"}>
                <PriceHeader dashTheme={'gdark'} setDashTheme={setDashTheme} userData={user} />
                <div className="flex w-full h-full">
                    <Flex className="w-full h-full p-8 max-[600px]:p-4 relative flex-col gap-4 items-center">
                        <BottomFade classname="origin-bottom" delay={0}>
                            <Badge variant="light" color="yellow" size="lg">Our Plans</Badge>
                        </BottomFade>
                        <BottomFade classname="origin-bottom" delay={0.2}>
                            <h1 className={" font-black text-center text-5xl max-[600px]:text-3xl"}>The Tools You Need <br /> To Trade Smarter</h1>
                        </BottomFade>
                        <BottomFade classname="origin-bottom" delay={0.25}>
                            <p className="text-sm max-[600px]:text-xs italic text-zinc-400 text-center max-w-[750px]">
                            Experience the power of GhostBoard with flexible pricing designed for traders at every level. Unlock advanced analytics, real-time tools, and exclusive features to stay ahead of the market. Start risk-free with our <span className="text-white">7-day free trial</span> and discover why thousands trust GhostBoard to transform their trading strategies.
                            </p>
                        </BottomFade>
                        <Flex className="gap-4 mb-10 w-full h-full justify-center mt-3">
                            <SquishyCard />
                        </Flex>
                    </Flex>
                </div>
                <Footer />
            </div>
            {/* <FlickerBg /> */}
          </MantineProvider>
        </UserProvider>
    )
}