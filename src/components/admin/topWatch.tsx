'use client'
import { getUsers } from "@/lib/admin/users";
import { cn } from "@/lib/utils";
import { formatDateToTz } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { fetchFlow } from "@/utils/modules/fetchFlow";
import { showDashNotification } from "@/utils/notificationManager";
import { useResizeObserver } from "@/utils/tools/useResizeObserver";
import { Avatar, Badge, Image, Table } from "@mantine/core";
import { IconBan, IconEdit, IconTrash } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";

type TopWatchData = {
    id: number;       // Auto-incremented ID
    stock: string;    // Ticker symbol (e.g., 'AAPL')
    trend: string;    // Trend information (e.g., 'Bullish', 'Bearish')
    title: string;    // Title of the entry
    body: string;     // Detailed body content
    img: string;
};

export default function TopWatchData() {
    const [data, setData] = useState<TopWatchData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const isSmall = useResizeObserver(parentRef, 600);
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/fetchTopWatch");
        const data = await response.json();
        setData(data.topwatch);
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
      
    }, []);

    const handleSubmit = async (id: number) => {
        setError('');
      
        try {
          const response = await fetch("/api/admin/addTopWatch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id, action: 'delete' }),
          });
        
          const data = await response.json();
        
          if (!data.success) {
            showDashNotification({
              title: `Error`,
              message: data.message || "An error occurred. Please try again.",
              withClose: false
            })
            return;
          } else {
            showDashNotification({
              title: `Success`,
              message: data.message || "An error occurred. Please try again.",
              withClose: false
            })
            fetchData();
            return;
          }
        } catch (err) {
          setError("An unexpected error occurred. Please try again.");
        } finally {
      }
    };

    const rows = data.map((element, index) => (
        <Table.Tr key={index}> 
          <Table.Td>
            <div className="flex w-fit gap-4 items-center">
                <div className={cn("flex flex-col w-fit h-fit gap-1 font-bold", isSmall ? "text-xs" : "")}>
                    {element.stock}
                    <div className="flex gap-1">
                      <Badge variant="light" ml={'-4px'} color={element.trend === 'Bullish' ? 'green' : 'red'} size="xs">{element.trend}</Badge>
                    </div>
                </div>
            </div>
          </Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>
            <div className="flex gap-2">
                <button type="button">
                    <IconTrash onClick={() => {handleSubmit(element.id)}} />
                </button>
            </div>
          </Table.Td>
        </Table.Tr>
    ));

    return (
        <div ref={parentRef} className="flex w-full h-full flex-col overflow-y-scroll relative">
            <Table striped highlightOnHover withRowBorders={false} stickyHeader stickyHeaderOffset={0}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Ticker</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </div>
    )
}