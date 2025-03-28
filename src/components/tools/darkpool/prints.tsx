'use client'
import { useToolsData } from "@/context/ToolsContext";
import { useUser } from "@/context/UserContext";
import { generateRandomScannerData, ScannerData } from "@/data/dashboard/demoData";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/formatNumber";
import { formatTimestamp } from "@/utils/formatTime";
import { fetchdarklevels } from "@/utils/modules/fetchDarkLevel";
import { fetchdarkprints } from "@/utils/modules/fetchDarkPrints";
import { fetchScanner } from "@/utils/modules/fetchScanner";
import { useResizeObserver } from "@/utils/tools/useResizeObserver";
import { Badge, ColorSwatch, Image, Table } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

const elements = generateRandomScannerData();

type DarkPrintssProps = {
  symbol?: string | null;
}

export default function DarkPrintssModule(props: DarkPrintssProps) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const isSmall = useResizeObserver(parentRef, 600);
  const user = useUser();
  const toolsData = useToolsData()

  useEffect(() => {
    const fetchData = async () => {
      setData(toolsData.darkPool.response);
    };
  
    if (user?.premium) {
      fetchData();

      const intervalId = setInterval(fetchData, 30000);
      
      return () => clearInterval(intervalId); 
    }
    
  }, [user, toolsData]);

  const rows = data.map((info, index) => (
    props.symbol === info.ticker && <Table.Tr key={index}>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>{formatTimestamp(info.tradeTime)}</Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>{info.size.toLocaleString("en-US")}</Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>${info.priceInCents / 100}</Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}> <div className="flex gap-1 items-center"><ColorSwatch color={info.tradeSideCode === "BB" ? "red" : "green"} size={'10px'} /> ${formatNumber(info.notionalValueInCents / 100) }</div></Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>${info.askPriceInCents / 100} - ${info.bidPriceInCents / 100}</Table.Td>
      </Table.Tr>
  ));

    return (
        <div ref={parentRef} className="flex w-full h-full flex-col overflow-y-scroll relative">
            <Table striped highlightOnHover withRowBorders={false} stickyHeader stickyHeaderOffset={0}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Time</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Qty</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Price</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Notional</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Bid - Ask</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </div>
    )
}