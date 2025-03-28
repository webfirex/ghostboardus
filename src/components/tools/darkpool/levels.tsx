'use client'
import { useUser } from "@/context/UserContext";
import { generateRandomScannerData, ScannerData } from "@/data/dashboard/demoData";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/formatNumber";
import { fetchdarklevels } from "@/utils/modules/fetchDarkLevel";
import { fetchScanner } from "@/utils/modules/fetchScanner";
import { useResizeObserver } from "@/utils/tools/useResizeObserver";
import { Badge, Image, Table } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

const elements = generateRandomScannerData();

type DarkLevelsProps = {
  filters?: {symbol: string, interval: string};
}

export default function DarkLevelsModule(props: DarkLevelsProps) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const isSmall = useResizeObserver(parentRef, 600);
  const user = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const darkLvlData = await fetchdarklevels({
          interval: props.filters?.interval === "Daily" ? "d" : "m",
          symbol: props.filters?.symbol,
        });
        setData(darkLvlData.response.priceInCentsToDarkPoolLevelDataSumModelMap);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
  
    if (user?.premium) {
      fetchData();

      const intervalId = setInterval(fetchData, 30000);
      
      return () => clearInterval(intervalId); 
    }
    
  }, [user, props.filters]);

  let rank = 1;

  const rows = Object.entries(data).sort(([, a], [, b]) => b.notionalValueInCentsSum - a.notionalValueInCentsSum).slice(0, 50).map(([priceInCents, details]) => (
      <Table.Tr key={priceInCents}>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>{rank++}</Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>${Number(priceInCents) / 100}</Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>${formatNumber(details.notionalValueInCentsSum / 100) }</Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>{details.tradeCountSum}</Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>{formatNumber(details.sizeSum)}</Table.Td>
      </Table.Tr>
  ));

    return (
        <div ref={parentRef} className="flex w-full h-full flex-col overflow-y-scroll relative">
            <Table striped highlightOnHover withRowBorders={false} stickyHeader stickyHeaderOffset={0}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Rank</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Price</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Value</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>TradeCount</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Volume</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </div>
    )
}