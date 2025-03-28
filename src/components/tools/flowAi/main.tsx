'use client'
import StockImage from "@/components/dashboard/stockImage";
import { useToolsData } from "@/context/ToolsContext";
import { useUser } from "@/context/UserContext";
import { generateRandomFlowAiData } from "@/data/dashboard/demoData";
import { cn } from "@/lib/utils";
import { fetchFlowAi } from "@/utils/modules/fetchFlowAi";
import { useResizeObserver } from "@/utils/tools/useResizeObserver";
import { Badge, Image, Table } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

const elements = generateRandomFlowAiData();


type Filters = {
  Put: boolean;
  Call: boolean;
  Repeat: boolean;
  Heavy: boolean;
  Golden: boolean;
  hgp: boolean;
  lgp: boolean;
};

type FlowAiData = {
  date: string;
  symbol: string;
  time: string; 
  exp: string;
  strike: string;
  cp: "PUT" | "CALL";
  details: string;
  alert: string;
  high: string;
  last: string;
  gain: string;
};

interface FlowAiProps {
  symbol?: string;
  filters?: Filters;
  dates?: [Date | null, Date | null];
}

export default function FlowAiModule(props: FlowAiProps) {
  const [data, setData] = useState<FlowAiData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const isSmall = useResizeObserver(parentRef, 600);
  const user = useUser();
  const toolsData = useToolsData();

  const fetchData = async () => {
    setLoading(true);
    try {
      setData(toolsData.flowAi.result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  
    if (user && user?.premium) {
      fetchData();

      const intervalId = setInterval(fetchData, 30000);
      
      return () => clearInterval(intervalId); 
    } else if (user) {
      setData(elements)
    }
    
  }, [props?.symbol, props.filters, toolsData]);

  function getHgp(alert: string, high: string) {
    const alertx = Number(alert) || 0
    const highx = Number(high) || 0

    let finalresult: number | null = Math.abs(((highx - alertx) / alertx) * 100)

    if (alertx === 0 || highx === 0) {
      finalresult = null
    }

    return(finalresult?.toFixed(2) || 0)
  }
  
  const rows = data.filter(item => 
      (!props.symbol || item.symbol === props.symbol) && 
      (props.filters?.Call ? props.filters?.Put ? item.cp : item.cp === 'CALL' : item.cp === 'PUT') && 
      (props.filters?.Heavy || item.details.split(" ")[0] != 'Heavy') &&
      (props.filters?.Golden || item.details.split(" ")[0] != 'Golden') &&
      (props.filters?.Repeat || item.details.split(" ")[0] != 'Repeat')
      ).filter((element) => {
        const expDate = new Date(element.exp); // Convert exp to Date
        const start = props.dates?.[0];
        const end = props.dates?.[1];
    
        if (!start && !end) return true; // No date selected, show all
        if (start && !end) return expDate.toDateString() === start.toDateString(); // Single date
        if (start && end) return expDate >= start && expDate <= end; // Range filter
    
        return false;
      }).map((element, index) => (
      isSmall ? <Table.Tr key={index}>
        <Table.Td>
          <div className="flex w-fit gap-4 items-center">
              <StockImage symbol={element.symbol} />
              <div className={cn("flex flex-col w-fit h-fit gap-1 font-bold text-xs", isSmall ? "text-[10px]" : "")}>
                  <span>{element.symbol} · {element.time}</span> 
                  <div className="flex">
                    <Badge variant="light" className="scale-75" color={element.cp === "CALL" ? "green" : 'red'} size="xs">{element.cp}</Badge>
                    <Badge variant="light" className="scale-75" color={element.details.split(" ")[0] === "Golden" ? "yellow" : element.details.split(" ")[0] === "Heavy" ? "lime" : undefined} size="xs">{element.details.split(" ")[0]}</Badge>
                  </div>
              </div>
          </div>
        </Table.Td>
        <Table.Td className={isSmall ? "text-[10px] text-center" : ""}>{element.exp} <br /> {element.strike}</Table.Td>
        <Table.Td className={isSmall ? "text-[10px] text-center" : ""}>{element.alert} <br /> {element.high}</Table.Td>
        <Table.Td className={isSmall ? "text-[10px] text-center" : ""}><p className={props.filters?.lgp ? element.gain === "N/A" ? ' text-white ' : element.gain > "0" ? " text-green-500 " : ' text-red-500 ' : getHgp(element.alert, element.high) === "N/A" ? ' text-white ' : getHgp(element.alert, element.high) > "0" ? " text-green-500 " : ' text-red-500 '} > {props.filters?.lgp ? element.gain : getHgp(element.alert, element.high) === 0 ? 'N/A' : getHgp(element.alert, element.high)} </p></Table.Td>
      </Table.Tr> : <Table.Tr key={index}>
        <Table.Td>
          <div className="flex w-fit gap-4 items-center">
              <StockImage symbol={element.symbol} />
              <div className={cn("flex flex-col w-fit h-fit gap-1 font-bold text-xs", isSmall ? "text-xs" : "")}>
                  {element.symbol}
                  {/* <p className=" text-xs text-zinc-400">{element.time}</p> */}
                  <div className="flex gap-1">
                    <Badge variant="light" color={element.cp === "CALL" ? "green" : 'red'} size="xs">{element.cp}</Badge>
                    <Badge variant="light" color={element.details.split(" ")[0] === "Golden" ? "yellow" : element.details.split(" ")[0] === "Heavy" ? "lime" : undefined} size="xs">{element.details.split(" ")[0]}</Badge>
                  </div>
              </div>
          </div>
        </Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.time}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.exp}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.strike}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.alert}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.high}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>
          <p className={props.filters?.lgp ? element.gain === "N/A" ? ' text-white ' : element.gain > "0" ? " text-green-500 " : ' text-red-500 ' : getHgp(element.alert, element.high) === "N/A" ? ' text-white ' : getHgp(element.alert, element.high) > "0" ? " text-green-500 " : ' text-red-500 '} > {props.filters?.lgp ? element.gain : getHgp(element.alert, element.high) === 0 ? 'N/A' : getHgp(element.alert, element.high)} </p>
        </Table.Td>
      </Table.Tr>
  ));

    return (
        <div ref={parentRef} className="flex w-full h-full flex-col overflow-y-scroll relative">
            <Table striped highlightOnHover withRowBorders={false} stickyHeader stickyHeaderOffset={0}>
                {isSmall ? <Table.Thead>
                  <Table.Tr>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Symbol</Table.Th>
                    <Table.Th className={cn("py-3 text-center", isSmall ? 'text-xs' : '')}>Exp Strike</Table.Th>
                    <Table.Th className={cn("py-3 text-center", isSmall ? 'text-xs' : '')}>Alert High</Table.Th>
                    <Table.Th className={cn("py-3 text-center text-nowrap", isSmall ? 'text-xs' : '')}>% Gain</Table.Th>
                  </Table.Tr>
                </Table.Thead> : <Table.Thead>
                  <Table.Tr>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Symbol</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Time</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Exp</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Strike</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Alert</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>High</Table.Th>
                    <Table.Th className={cn("py-3 text-nowrap", isSmall ? 'text-xs' : '')}>% Gain</Table.Th>
                  </Table.Tr>
                </Table.Thead>}
                <Table.Tbody>
                  {rows}
                  {data.length === 0 && <p className="text-xs p-2 text-zinc-400">Opps ! No data available</p>}
                </Table.Tbody>
            </Table>
        </div>
    )
}