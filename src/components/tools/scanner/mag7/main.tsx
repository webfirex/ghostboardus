'use client'
import StockImage from "@/components/dashboard/stockImage";
import { useUser } from "@/context/UserContext";
import { generateRandomScannerData, ScannerData } from "@/data/dashboard/demoData";
import { cn } from "@/lib/utils";
import { fetchMagScanner, fetchScanner } from "@/utils/modules/fetchScanner";
import { useResizeObserver } from "@/utils/tools/useResizeObserver";
import { Badge, Image, Table } from "@mantine/core";
import { IconCaretDownFilled, IconCaretUpFilled, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

const elements = generateRandomScannerData();

type ScanerProps = {
  filters?: {type: string, interval: string};
}

export default function Mag7ScannerModule(props: ScanerProps) {
  const [data, setData] = useState<ScannerData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const isSmall = useResizeObserver(parentRef, 600);
  const user = useUser();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const scannerData = await fetchMagScanner();
        setData(scannerData);
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
    } else {
      setData(elements);
    }
    
  }, [user, props.filters]);
  
  const rows = data.sort((a, b) => 
    sortOrder === 'asc' ? a["1D"] - b["1D"] : b["1D"] - a["1D"]).map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <div className="flex w-fit gap-4 items-center">
              <StockImage symbol={element.symbol} />
              <div className={cn("flex flex-col w-fit h-fit gap-1 font-bold text-xs", isSmall ? "text-[10px]" : "")}>
                  {element.symbol}
                  {/* <p className=" text-xs text-zinc-400">{element.time}</p> */}
                  <div className="flex gap-1">
                    {/* <p className="text-zinc-400">Stock Name</p> */}
                  </div>
              </div>
          </div>
        </Table.Td>
        {/* <Table.Td className={isSmall ? "text-xs" : ""}>{type + ' ' + interval}</Table.Td> */}
        <Table.Td className={isSmall ? "text-[10px]" : ""}>${element.high}</Table.Td>
        <Table.Td className={(isSmall ? "text-[10px] " : " ") + (element["1D"] < 0 ? ' text-red-500 ' : ' text-green-500 ')}>{element["1D"].toFixed(2)}%</Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>${element.high}</Table.Td>
        <Table.Td className={isSmall ? "text-[10px]" : ""}>${element.low}</Table.Td>
      </Table.Tr>
  ));

    return (
        <div ref={parentRef} className="flex w-full h-full flex-col overflow-y-scroll relative">
            <Table striped highlightOnHover withRowBorders={false} stickyHeader stickyHeaderOffset={0}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Symbol</Table.Th>
                    {/* <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Type</Table.Th> */}
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Price</Table.Th>
                    <Table.Th className={cn("py-3 cursor-pointer select-none", isSmall ? 'text-xs ' : ' ') + ' text-nowrap'} onClick={() => {sortOrder === 'asc' ? setSortOrder('desc') : setSortOrder('asc')}}> <div className="flex items-center gap-2">Change % {sortOrder === 'asc' ? <IconCaretDownFilled size={'15px'} /> : <IconCaretUpFilled size={'15px'} />}</div></Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>High</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Low</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {rows}
                </Table.Tbody>
            </Table>
        </div>
    )
}