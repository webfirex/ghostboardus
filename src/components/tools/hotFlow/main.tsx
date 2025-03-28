'use client'
import StockImage from "@/components/dashboard/stockImage";
import { useUser } from "@/context/UserContext";
import { generateRandomFlowAiData } from "@/data/dashboard/demoData";
import { cn } from "@/lib/utils";
import { fetchHotAi } from "@/utils/modules/fetchHotFlow";
import { useResizeObserver } from "@/utils/tools/useResizeObserver";
import { Badge, Image, Table } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

const elements = generateRandomFlowAiData();

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

export default function HotFlowModule() {
  const [data, setData] = useState<FlowAiData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const isSmall = useResizeObserver(parentRef, 600);
  const user = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const flowAiData = await fetchHotAi({
          symbol: null,
          putOption: true,
          callOption: true,
          repeatEtf: 'false',
          repeatOption: 'false',
          heavyOption: 'false',
          goldenColor: 'false',
        });
        setData(flowAiData.result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
  
    if (user?.premium) {
      fetchData();

      // const intervalId = setInterval(fetchData, 10000);
      
      // return () => clearInterval(intervalId); 
    } else {
      setData(elements)
    }
    
  }, []);
  
  const rows = data.map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <div className="flex w-fit gap-4 items-center">
              <StockImage symbol={element.symbol} />
              <div className={cn("flex flex-col w-fit h-fit gap-1 font-bold text-xs", isSmall ? "text-xs" : "")}>
                  {element.symbol}
                  {/* <p className=" text-xs text-zinc-400">{element.time}</p> */}
                  <div className="flex gap-1">
                    <Badge variant="light" color={element.cp === "CALL" ? "green" : 'red'} size="xs">{element.cp}</Badge>
                    <Badge variant="light" size="xs">{element.details.split(" ")[0]}</Badge>
                  </div>
              </div>
          </div>
        </Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.time}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.exp}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.strike}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.alert}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.high}</Table.Td>
        <Table.Td className={isSmall ? "text-xs" : ""}>{element.gain}</Table.Td>
      </Table.Tr>
  ));

    return (
        <div ref={parentRef} className="flex w-full h-full flex-col overflow-y-scroll relative">
            <Table striped highlightOnHover withRowBorders={false} stickyHeader stickyHeaderOffset={0}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Symbol</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Time</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Exp</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Strike</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Alert</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>High</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>% Gain</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </div>
    )
}