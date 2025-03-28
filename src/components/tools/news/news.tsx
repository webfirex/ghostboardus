'use client'
import { useUser } from "@/context/UserContext";
import { formatDateToTz } from "@/utils/formatDate";
import { fetchNews } from "@/utils/modules/fetchNews";
import { Badge, Indicator, Avatar, Skeleton, Input } from "@mantine/core";
import { IconBrandYoutubeFilled, IconBrandDiscordFilled, IconCast, IconNews, IconFilterFilled, IconSearch, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TicketMeta {
    removed: boolean;
    id: number;
    createdTime: string; // ISO 8601 date string
    tickerMetadata: {
        ticker: string;
        primary: boolean;
        sentiment: number;
    }[];
    title: string;
    topics: string[];
}

interface AlertCardProps {
    data: TicketMeta;
}

function AlertCard({data}: AlertCardProps) {
    return (
        <Link href={'/dashboard/news/' + data.id} className="flex flex-col w-full p-2 rounded-lg bg-zinc-900/50 cursor-pointer">
            <div className="flex w-full justify-between items-center">
                <p className="text-[10px] line-clamp-1 w-full truncate text-primaryLight">{data.topics.map((topic, index) => (
                    <>{topic}{index + 1 != data.topics.length && <>,</>} </>
                ))}</p>
                <p className="text-[10px] line-clamp-1 w-full text-right text-nowrap text-zinc-400">{formatDateToTz(data.createdTime)}</p>
            </div>
            <p className="text-xs line-clamp-2">{data.title}</p>
            <p className="text-[10px] line-clamp-2 text-zinc-400 mt-2">{data.tickerMetadata.map((ticker, index) => (
                <>{ticker.ticker} {index + 1 != data.tickerMetadata.length && <>|</>} </>
            ))}</p>
        </Link>
    );
}

export default function NewsModule() {
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState('')
    const user = useUser();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchNews();
          data.length > 0 && setNews(data);
        } catch (error) {
          // setError(error);
        }
      };
      fetchData();

      const intervalId = setInterval(fetchData, 60000);
      
      return () => clearInterval(intervalId); 
      
    }, []);

    return (
        <div className="flex w-full flex-col bg-zinc-400/5 rounded-lg p-2 gap-2">
            <div className="flex items-center justify-between w-full">
                <Badge size="lg" p={10} color="white" variant="light">
                    <div className="flex gap-2 items-center"><IconNews size={'15px'} />News Articles</div> 
                </Badge>
                <Input
                  placeholder="AAPL"
                  value={search}
                  onChange={(event) => setSearch(event.currentTarget.value.toUpperCase())}
                  leftSection={<IconSearch stroke={'1.5'} size={'12'} />}
                  rightSection={search !== '' ? <IconX size={'12'} onClick={() => setSearch('')} /> : undefined}
                  maw={'100px'}
                  rightSectionPointerEvents="auto"
                  size="xs"
                />
            </div>
            {user ? <div className="flex w-full flex-col py-2 border-t border-white/10 h-[450px] overflow-y-scroll gap-2">
                {
                    news && news.length > 0 && news.filter((item: any) =>
                        !search || item.tickerMetadata.some((ticker: any) => ticker.ticker === search)
                    ).map((data, index) => (
                        <AlertCard data={data} key={index} />
                    ))
                }
            </div> : <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-[450px] opacity-5" />}
        </div>
    )
}