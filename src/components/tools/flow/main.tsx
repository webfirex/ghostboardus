'use client'
import StockImage from "@/components/dashboard/stockImage";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/formatNumber";
import { fetchFlow } from "@/utils/modules/fetchFlow";
import { useResizeObserver } from "@/utils/tools/useResizeObserver";
import { Badge, Image, Table } from "@mantine/core";
import { useState, useEffect, useRef } from "react";

type FlowData = {
  date: string;
  time: string;
  combinedDateTime: string;
  symbol: string;
  type: string;
  volume: string;
  price: number;
  side: string;
  cp: string;
  strike: string;
  spot: number;
  premium: string;
  exp: string;
  color: string;
  iv: string;
  dte: string;
  er: string;
  stock_etf: string;
  sector: string;
  uoa: string;
  weekly: string;
  mktcap: string;
  oi: string;
  id: string;
  premiumRaw: number;
};

type Filters = {
  put: boolean;
  call: boolean;
  yellow: boolean;
  white: boolean;
  magenta: boolean;
  aboveAsk: boolean;
  belowBid: boolean;
  atAsk: boolean;
  atBid: boolean;
  stock: boolean;
  etf: boolean;
  inM: boolean;
  outM: boolean;
  sweep: boolean;
  minVal: string;
  minCVal: string;
  maxCVal: string;
  strike: string;
  page: number;
};

interface FlowProps {
  symbol?: string;
  filters?: Filters;
  pages?: number;
  dates?: [Date | null, Date | null];
  setPages?: React.Dispatch<React.SetStateAction<number>>;
}

export default function FlowModule(props: FlowProps) {
    const [data, setData] = useState<FlowData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const isSmall = useResizeObserver(parentRef, 600);
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const flowData = await fetchFlow({
          page: props.filters?.page,
          pageSize: 50,
          symbol: props.symbol === '' ? null : props.symbol,
          putOption: props.filters?.put,
          callOption: props.filters?.call,
          yellowColor: props.filters?.yellow,
          whiteColor: props.filters?.white,
          magentaColor: props.filters?.magenta,
          aboveAsk: props.filters?.aboveAsk,
          belowBid: props.filters?.belowBid,
          atOrAboveAsk: props.filters?.atAsk,
          atOrBelowAsk: props.filters?.atBid,
          stockSecurity: props.filters?.stock,
          ETFSecurity: props.filters?.etf,
          minimumValue: props.filters?.minVal === '' ? null : props.filters?.minVal,
          minimumCValue: props.filters?.minCVal === '' ? null : props.filters?.minCVal,
          maximumCValue: props.filters?.maxCVal === '' ? null : props.filters?.maxCVal,
          strikeValue: props.filters?.strike === '' ? null : props.filters?.strike,
          inTheMoney: props.filters?.inM,
          outTheMoney: props.filters?.outM,
          sweepOnly: props.filters?.sweep,
          weekOnly: 'true',
        });
        flowData.result && setData(flowData.result);
        flowData.result_info.pages && props.setPages?.(flowData.result_info.pages)
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();

      const intervalId = setInterval(fetchData, 30000);
      
      return () => clearInterval(intervalId);
      
    }, [props.symbol, props.filters]);

    const rows = data.filter((element) => {
      const expDate = new Date(element.exp); // Convert exp to Date
      const start = props.dates?.[0];
      const end = props.dates?.[1];
  
      if (!start && !end) return true; // No date selected, show all
      if (start && !end) return expDate.toDateString() === start.toDateString(); // Single date
      if (start && end) return expDate >= start && expDate <= end; // Range filter
  
      return false;
    }).map((element, index) => (
        !isSmall ? <Table.Tr key={index}> 
          <Table.Td>
            <div className="flex w-fit gap-4 items-center">
                {!isSmall && <StockImage symbol={element.symbol} />}
                <div className={cn("flex flex-col w-fit h-fit gap-1 font-bold", isSmall ? "text-xs" : "")}>
                    {element.symbol}
                    <div className="flex gap-1">
                      <Badge variant="light" color={element.color} ml={'-4px'} size="xs">{element.type}</Badge>
                    </div>
                </div>
            </div>
          </Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>{element.time}</Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>{element.exp}</Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>{element.strike}</Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>
            <Badge variant="light" color={element.cp === "CALL" ? "green" : 'red'} size="xs">{element.cp}</Badge>
          </Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>{element.spot}</Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>{element.volume} @ {isSmall && <br />} {element.price} ({element.side})</Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>{formatNumber(element.premiumRaw)}</Table.Td>
        </Table.Tr> : <Table.Tr key={index}> 
        <Table.Td>
          <div className="flex w-fit gap-4 items-center">
              <div className={cn("flex flex-col w-fit h-fit gap-1 font-bold ", isSmall ? " text-[10px]" : "")}>
                  <span>{element.symbol} · {element.time}</span> 
                  <div className="flex gap-1">
                    <Badge variant="light" color={element.color} ml={'-4px'} className="scale-75" size="xs">{element.type}</Badge>
                  </div>
              </div>
          </div>
        </Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>
          <div className="text-center">{element.exp} <br /> {element.strike}</div>
        </Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>
          <div className="text-center gap-1"><Badge variant="light" color={element.cp === "CALL" ? "green" : 'red'} size="xs">{element.cp}</Badge> <br /> {element.spot}</div>
        </Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>
          <div className="text-center text-nowrap w-full">{element.volume} @ {element.price} ({element.side}) <br /> {formatNumber(element.premiumRaw)}</div>
        </Table.Td>
        {/* <Table.Td className={isSmall ? "text-xs" : ""}>{element.exp}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.strike}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>
          <Badge variant="light" color={element.cp === "CALL" ? "green" : 'red'} size="xs">{element.cp}</Badge>
        </Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.spot}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.volume} @ {isSmall && <br />} {element.price} ({element.side})</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{formatNumber(element.premiumRaw)}</Table.Td> */}
      </Table.Tr>
    ));

    return (
        <div ref={parentRef} className="flex w-full h-full flex-col overflow-y-scroll relative">
            <Table striped highlightOnHover withRowBorders={false} stickyHeader stickyHeaderOffset={0}>
                <Table.Thead>
                  {isSmall ? <Table.Tr>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Symbol</Table.Th>
                    <Table.Th className={cn("py-3 text-center ", isSmall ? 'text-xs' : '')}>Exp Strike</Table.Th>
                    <Table.Th className={cn("py-3 text-center ", isSmall ? 'text-xs' : '')}>C/P Spot</Table.Th>
                    <Table.Th className={cn("py-3 text-center ", isSmall ? 'text-xs' : '')}>Value</Table.Th>
                  </Table.Tr> : <Table.Tr>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Symbol</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Time</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Exp</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Strike</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>C/P</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Spot</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Details</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Value</Table.Th>
                  </Table.Tr>}
                </Table.Thead>
                <Table.Tbody>
                  {rows}
                  {data.length === 0 && <p className="text-xs p-2 text-zinc-400">Opps ! No data available</p>}
                </Table.Tbody>
            </Table>
        </div>
    )
}