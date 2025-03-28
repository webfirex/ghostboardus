'use client'
import { cn } from "@/lib/utils";
import Marquee from "../ui/marquee";
import { useEffect, useState } from "react";

const ExchangeCard = ({
  symbol,
  '1D': oneDayChange,
  price
}: {
  symbol: string;
  '1D': number;
  price: number;
}) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl p-2 mx-7"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <p className="text-4xl font-medium text-white uppercase">{symbol}</p>
        <div className="flex flex-col">
          <p className={cn("text-lg", ' text-zinc-400 font-light')}>{price}</p>
          <div className="flex items-center gap-1">
            <p className={cn("text-xs", oneDayChange >= 0 ? ' text-green-500 ' : ' text-red-500 ')}>{oneDayChange}</p>
            <p className={cn("text-xs", oneDayChange >= 0 ? ' text-green-500 ' : ' text-red-500 ')}>{oneDayChange >= 0 ? '▲' : '▼'}</p>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default function StocksMarquee() {
  const [tickerTape, setTickerTape] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/fetchTickers");
        const result = await data.json();
        setTickerTape(result)
      } catch (error) {
        console.error("Error fetching indicator:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 120000);
    
    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="relative flex w-full justify-between items-center flex-col overflow-hidden my-24 z-10 bg-black/10 py-7 backdrop-blur-lg">
      <Marquee pauseOnHover className="[--duration:50s]">
        {tickerTape && tickerTape.length > 0 && tickerTape.map((exchange) => (
          <ExchangeCard key={exchange.ticker} {...exchange} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-dark/70"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-dark/70"></div>
    </div>
  );
}