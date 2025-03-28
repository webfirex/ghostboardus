'use client'
import React from "react";
import { Badge, Divider, Flex, Text } from "@mantine/core";
import { IconCircleCheckFilled, IconXboxXFilled } from "@tabler/icons-react"; 
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

// Initialize Stripe outside the component to avoid re-creating the object
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const handleCheckout = async (pId: string, email: string) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe initialization failed.");
    }

    // Send a POST request to the API route
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prodId: pId, email: email}), // Replace with your actual product price ID
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create checkout session.");
    }

    const { sessionId } = await response.json();
    await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    console.error("Error during checkout:", error);
  }
};

const SquishyCard = () => {
  return (
    <section className="w-full h-full px-4">
      <div className="w-full h-full justify-center items-center gap-4 flex-wrap flex ">
        <Card />
        <Card2 />
      </div>
    </section>
  );
};

const Card = () => {
  const user = useUser();
  const router = useRouter();

  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative border border-zinc-600 border-t-8 w-80 max-[600px]:w-70 shrink-0 overflow-hidden rounded-xl bg-zinc-700/5"
    >
      <div className="relative p-8 h-fit z-10 text-white" style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(25px)'
      }}>
        <Badge variant="outline" size="lg" color='#fff'>Prime</Badge>
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className={" my-2 block origin-top-left font-mono text-4xl text-white leading-[1.2]"}
        >
          $49 <p className={" text-md"} style={{ fontSize: '16px' }}>/ 30 days</p> 
        </motion.span>
        <Divider className="w-full my-4" />
        <Flex gap={'4px'} mb={'35px'} direction={'column'}>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Real Time Options Order Flow
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Real Time Darkpool Prints
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Real Time Gamma / GEX
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Real Time News
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Net Premium Flow
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Net Flow / Market Tide
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Artificial Intelligence Unusual Flow Alerts
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Daily Watchlist
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Advanced Screeners
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Darkpool Levels
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Daily Newsletter
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Advanced Data Filters
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Educational Resources
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Economic Calendar
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Web & Mobile Compatibility
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconXboxXFilled size={'20px'} color="#d20000" /> Exclusive 1 on 1 Educational Session
          </Text>
        </Flex>
      </div>
      <button type="button" onClick={() => {user ? !user.premium ? handleCheckout('price_1OI42vDofbrh8xjr66LlgyHr', user?.email ?? '') : null : router.push("/auth/signup")}} className={(!user?.premium ? ' ' : ' opacity-50 cursor-default ') + " inline-flex h-10 absolute bottom-4 left-4 right-4 z-20 animate-shimmerz items-center justify-center rounded-xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-xs"}>
        {!user?.premium ? 'Start 7-Day Free Trial Now' : 'Already Subscribed'}
      </button>
      {/* <Background /> */}
    </motion.div>
  );
};

const Card2 = () => {
  const user = useUser();
  const router = useRouter();

  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative border border-primaryLight border-t-8 border-separate w-80 max-[600px]:w-70 shrink-0 overflow-hidden rounded-xl !bg-zinc-900/5"
    >
      <div className="relative p-8 h-full z-10 text-white" style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(25px)'
      }}>
        <Badge variant="filled" size="lg" color='#4F4ACC'>Pro</Badge>
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className={" my-2 block origin-top-left font-mono text-4xl text-green-300 leading-[1.2]"}
        >
          $545 <p className={" text-white text-md"} style={{ fontSize: '16px' }}>/ 1 year</p> 
        </motion.span>
        <Divider className="w-full my-4" />
        <Flex gap={'4px'} mb={'35px'} direction={'column'}>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Real Time Options Order Flow
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Real Time Darkpool Prints
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Real Time Gamma / GEX
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Real Time News
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Net Premium Flow
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Net Flow / Market Tide
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Artificial Intelligence Unusual Flow Alerts
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Daily Watchlist
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Advanced Screeners
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Darkpool Levels
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Daily Newsletter
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Advanced Data Filters
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Educational Resources
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Economic Calendar
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Web & Mobile Compatibility
          </Text>
          <Text size="xs" c={'#fff'} className="flex items-center gap-1">
            <IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Exclusive 1 on 1 Educational Session
          </Text>
        </Flex>
      </div>
      {/* <button className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white hover:bg-white py-2 text-center font-mono font-black uppercase hover:text-neutral-800 backdrop-blur transition-colors bg-zinc-950 text-white">
        Start 7-Day Free Trial Now
      </button> */}

      <button type="button" onClick={() => {user ? !user.premium ? handleCheckout('price_1OI42vDofbrh8xjrVgCl6SyB', user?.email ?? '') : null : router.push("/auth/signup")}} className={(!user?.premium ? ' ' : ' opacity-50 cursor-default ') + " inline-flex h-10 absolute bottom-4 left-4 right-4 z-20 animate-shimmerz items-center justify-center rounded-xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-xs"}>
        {!user?.premium ? 'Start 7-Day Free Trial Now' : 'Already Subscribed'}
      </button>
      
      {/* <Background /> */}
    </motion.div>
  );
};

const Card3 = () => {

  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative border border-zinc-600 border-t-8 h-96 w-80 max-[600px]:w-70 shrink-0 overflow-hidden rounded-xl bg-white"
    >
      <div className="relative p-8 h-full z-10 text-white" style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(25px)'
      }}>
        <Badge variant="outline" size="lg" color='#000'>Personal</Badge>
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className={" my-2 block origin-top-left font-mono text-4xl text-white leading-[1.2]"}
        >
          &#8377;9999 <p className={" text-md"} style={{ fontSize: '16px' }}>/ 60 days</p> 
        </motion.span>
        <Divider className="w-full my-4" />
        <Flex gap={'4px'} direction={'column'}>
          <Text size="xs" c={'#000'} className="flex items-center gap-1"><IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Min Budget 1ooooo+</Text>
          <Text size="xs" c={'#000'} className="flex items-center gap-1"><IconCircleCheckFilled size={'20px'} color="#72ff8c" /> 20 GL teams per match</Text>
          <Text size="xs" c={'#000'} className="flex items-center gap-1"><IconCircleCheckFilled size={'20px'} color="#72ff8c" /> 3 SL team per macth</Text>
          <Text size="xs" c={'#000'} className="flex items-center gap-1"><IconCircleCheckFilled size={'20px'} color="#72ff8c" /> 80% Winning Rate</Text>
          <Text size="xs" c={'#000'} className="flex items-center gap-1"><IconCircleCheckFilled size={'20px'} color="#72ff8c" /> 24 / 7 Chat + Call + Private support</Text>
          <Text size="xs" c={'#000'} className="flex items-center gap-1"><IconCircleCheckFilled size={'20px'} color="#72ff8c" /> Max. 4 matches / Day</Text>
        </Flex>
      </div>
      <a href='https://payments.cashfree.com/forms/cricket11team-personal' className="inline-flex h-10 absolute bottom-4 left-4 right-4 z-20 animate-shimmerz items-center justify-center rounded-xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        Buy Now
      </a>
      {/* <Background /> */}
    </motion.div>
  );
};

const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#ff0004"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#ff0004"
      />
    </motion.svg>
  );
};

export default SquishyCard;