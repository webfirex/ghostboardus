'use client'
import { getUsers } from "@/lib/admin/users";
import { cn } from "@/lib/utils";
import { formatDateToTz } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";
import { fetchFlow } from "@/utils/modules/fetchFlow";
import { useResizeObserver } from "@/utils/tools/useResizeObserver";
import { Avatar, Badge, Image, Table } from "@mantine/core";
import { IconBan, IconEdit, IconTrash } from "@tabler/icons-react";
import { useState, useEffect, useRef } from "react";

type UserData = {
    id: string;                 // UUID of the user
    pfpic: string | null;       // Profile picture URL or null if not set
    name: string;               // Name of the user
    email: string;              // Email address of the user
    password: string;           // Hashed password of the user
    created_at: string;         // Timestamp of account creation (ISO string format)
    ip: string | null;          // IP address of the user or null if not recorded
    status: boolean;            // Account status (true = active, false = inactive)
    premium: boolean;           // Premium status (true = premium, false = standard)
    subdate: string | null;     // Subscription start date (ISO string format) or null
    expdate: string | null;     // Subscription expiration date (ISO string format) or null
    notifications: any | null;  // Notifications data (JSON object or null)
    email_stat: boolean;        // Email status (true = verified, false = unverified)
    is_online: boolean; 
};

export default function UserData() {
    const [data, setData] = useState<UserData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const isSmall = useResizeObserver(parentRef, 600);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const userData = await getUsers();
          setData(userData.user);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();

      const intervalId = setInterval(fetchData, 30000);
      
      return () => clearInterval(intervalId);
      
    }, []);

    const handleSubmit = async (id: string) => {
        setError('');
      
        try {
          const response = await fetch("/api/admin/banUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
          });
        
          const data = await response.json();
        
          if (!response.ok) {
            setError(data.message || "An error occurred. Please try again.");
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
                {<Avatar src={element.pfpic ? element.pfpic : null} alt="user image" className=" w-[35px] h-[35px]" radius={'sm'} />}
                <div className={cn("flex flex-col w-fit h-fit gap-1 font-bold", isSmall ? "text-xs" : "")}>
                    {element.name}
                    <div className="flex gap-1">
                      <Badge variant="light" ml={'-4px'} size="xs">{element.status ? 'active' : 'banned'}</Badge>
                    </div>
                </div>
            </div>
          </Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>{element.email}</Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}><Badge variant="light" color={element.is_online ? "green" : 'red'} size="xs">{element.is_online ? 'Online' : 'Offline'}</Badge></Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>{formatDateToTz(element.created_at)}</Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>
            <Badge variant="light" color={element.email_stat ? "green" : 'red'} size="xs">{element.email_stat ? 'Verified' : 'Unverified'}</Badge>
          </Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}><Badge variant="light" color={element.premium ? "yellow" : 'white'} size="xs">{element.premium ? 'Premium' : 'Free Plan'}</Badge></Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>{element.subdate}</Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>{element.expdate}</Table.Td>
          <Table.Td className={isSmall ? "text-xs" : ""}>
            <div className="flex gap-2">
                <button type="button">
                    <IconBan onClick={() => {handleSubmit(element.id)}} />
                </button>
                <button type="button">
                    <IconEdit onClick={() => {}} />
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
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Profile</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Email</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Online</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>SignUp Date</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Email Status</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Premium</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Sub Date</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Exp Date</Table.Th>
                    <Table.Th className={cn("py-3", isSmall ? 'text-xs' : '')}>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </div>
    )
}