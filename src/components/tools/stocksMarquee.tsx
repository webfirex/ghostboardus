'use client'
import Marquee from "@/components/ui/marquee";
import { useToolsData } from "@/context/ToolsContext";
import { cn } from "@/lib/utils";
import { fetchTickerTape } from "@/utils/modules/fetchTickerTape";
import { useEffect, useState } from "react";

const ExchangeCard = ({
  symbol,
  '1D': oneDayChange
}: {
  symbol: string;
  '1D': number;
}) => {

  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl p-2"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <p className="text-xs font-medium text-white uppercase">{symbol}</p>
        <div className="flex flex-col">
          <p className={cn("text-xs", oneDayChange >= 0 ? ' text-green-500 ' : ' text-red-500 ')}>{oneDayChange.toFixed(2)}%</p>
        </div>
        <p className={cn("text-xs", oneDayChange >= 0 ? ' text-green-500 ' : ' text-red-500 ')}>{oneDayChange >= 0 ? '▲' : '▼'}</p>
      </div>
    </figure>
  );
};

export default function StocksMarquee() {

  const [tickerTape, setTickerTape] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const toolsData = useToolsData()

  useEffect(() => {
    const fetchData = async () => {
      setTickerTape(toolsData?.ticketTape);
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 20000);
    
    return () => clearInterval(intervalId); 
    
  }, [toolsData]);

  return (
    <div className=" flex w-full h-full justify-between items-center flex-col overflow-hidden">
      <Marquee pauseOnHover className="[--duration:50s] w-full overflow-hidden h-full">
        {tickerTape && tickerTape.length > 0 && tickerTape.map((exchange) => (
          <ExchangeCard key={exchange.symbol} {...exchange} />
        ))} 
      </Marquee>
    </div>
  );
}