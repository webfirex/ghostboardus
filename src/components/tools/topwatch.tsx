'use client'
import { cn } from "@/lib/utils";
import { Popover, Image, Badge, Title, Modal, Divider, Menu, Tooltip, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCaretDownFilled, IconCaretUpFilled, IconChartCovariate, IconChartScatter, IconChevronDown, IconFilterFilled, IconInfoCircle, IconPhotoScan } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import TradingViewWidget from '@/components/dashboard/tradingViewWidget'
import { useMainModules } from "@/data/dashboard/modules";
import { useUser } from "@/context/UserContext";
import NotPremiumOverlay from "../ui/notPremiumOverlay";
import FlowModule from "./flow/main";
import FlowAiModule from "./flowAi/main";

type TopWatchPopupProps = {
    ticker: string;
    dropImg: string;
    body: string | TrustedHTML;
    title?: string;
    trend?: string;
    className?: string;
};

type TopWatchData = {
    id: number;       // Auto-incremented ID
    stock: string;    // Ticker symbol (e.g., 'AAPL')
    trend: string;    // Trend information (e.g., 'Bullish', 'Bearish')
    title: string;    // Title of the entry
    body: string;     // Detailed body content
    img: string;
};

function FlowModulex({symbol, src} : {symbol: string, src: string | null}) {
    const MainModules = useMainModules()
    const [activeModule, setActiveModule] = useState<string>('flowai');
    const [image, setImage] = useState<boolean>(true);
    const user = useUser();
    const [pages, setPages] = useState<number>(0);

    const [flowAiFilters, setFlowAiFilters] = useState({
        Put: true,
        Call: true,
        Repeat: true,
        Heavy: true,
        Golden: true,
        hgp: false,
        lgp: true,
    });

    const [FlowFilters, setFlowFilters] = useState({
        put: true,
        call: true,
        yellow: true,
        white: true,
        magenta: true,
        aboveAsk: true,
        belowBid: true,
        atAsk: true,
        atBid: true,
        stock: true,
        etf: true,
        inM: true,
        outM: true,
        sweep: false,
        minVal: '',
        minCVal: '',
        maxCVal: '',
        strike: '',
        page: 1,
    });

    const setFlowFilter = (key: string, value: any) => {
        setFlowFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex w-full flex-col bg-zinc-700/5 p-2 rounded-lg h-full gap-2">
            <div className="flex w-full justify-between border-b border-white/5 h-fit">
                <div className="flex w-fit gap-2 items-center">
                    <Menu position="bottom-start" withArrow disabled={user?.premium ? false : true}>
                        <Menu.Target>
                            <button className="flex gap-2 px-4 py-2 items-center justify-between w-[150px] border border-white/5 rounded-t-md border-b-0">
                                <div className="flex gap-2 items-center">
                                    {activeModule === "flowai" ? <IconChartCovariate size={'12'} /> : <IconChartScatter size={'12'} />}
                                    <p className=" text-sm text-nowrap">{activeModule === "flowai" ? "Flow AI" : "Flow"}</p>
                                </div>
                                <IconChevronDown size={'12'} className={!user?.premium ? " opacity-30 " : ' opacity-70'} />
                            </button>
                        </Menu.Target>
                        <Menu.Dropdown miw={'200'}>
                          <Menu.Label>Tools</Menu.Label>
                                <Menu.Item className={activeModule === "flowai" ? " hidden " : " "} onClick={() => {setActiveModule('flowai'); setImage(false) }}>
                                    Flow AI
                                </Menu.Item>
                                <Menu.Item className={activeModule === "flow" ? " hidden " : " "} onClick={() => {setActiveModule('flow'); setImage(false) }}>
                                    Flow
                                </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>

                <div className="flex gap-2 ">
                    {activeModule === 'flow' && 
                    <Pagination hideWithOnePage value={FlowFilters.page} onChange={(e) => {setFlowFilter?.('page', e)}} siblings={0} boundaries={-1} size={"sm"} total={pages || 10} radius={"sm"} mb={'10px'} color="#635BFF" />}
                    <button type="button" className="w-[30px] h-[30px] cursor-pointer rounded-sm text-xs bg-primary aspect-square flex items-center justify-center" onClick={() => {setImage(!image)}}>
                        <IconPhotoScan stroke='1' size={'15'} />
                    </button>
                </div>
            </div>
            <div className="flex w-full flex-col gap-1 bg-black/15 p-2 rounded-lg h-[calc(100% - 40px)] relative max-h-[300px]" style={{height: 'calc(100% - 40px)'}}>
                {!user?.premium && <NotPremiumOverlay />}
                {image ? (activeModule === "flowai" ? <FlowAiModule filters={flowAiFilters} symbol={symbol} /> : <FlowModule filters={FlowFilters} symbol={symbol} pages={pages} setPages={setPages} />) : <Image src={src} alt="" className="w-full mt-3 rounded-md" />}
            </div>
        </div>
    )
}

function TopWatchPopup ({ dropImg, className, body, title, ticker, trend }: TopWatchPopupProps) {
    const [openedx, { close: closeModal, open: openModal }] = useDisclosure(false);
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
        <Popover position="bottom-start" withArrow shadow="md" opened={openedx} offset={5}>
            <Popover.Target>
                <div onClick={open} className={cn("flex flex-col items-start justify-center h-full aspect-square gap-1 cursor-pointer bg-zinc-400/5 rounded-full backdrop-blur-sm hover:mb-2 maxTab:hover:mb-0 transition-all", className)} onMouseEnter={openModal} onMouseLeave={closeModal}>
                    <Image src={`https://ghostboard.nyc3.cdn.digitaloceanspaces.com/ticker-logo/${ticker}.png`} alt="" h={"100%"} p={'10'} className="border border-white/0" />
                </div>
            </Popover.Target>
            <Popover.Dropdown style={{ pointerEvents: 'none' }} p={5} className=" min-w-[200px] max-w-[250px] maxTab:hidden">
                <div className="flex w-full justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <Badge size="md" color="white" variant="light">${ticker}</Badge>
                        {trend === "Bullish" ? <IconCaretUpFilled color={"green"}size={'20'} /> :
                        <IconCaretDownFilled color={"red" }size={'20'} /> }
                    </div>
                    <button type='button' className=" bg-primary/20 text-white text-[10px] py-1 px-3 rounded-full">Click to View More</button>
                </div>
                <Title order={6} my={'xs'} className="line-clamp-2">{title}</Title>
                {/* <div
                  dangerouslySetInnerHTML={{ __html: body }}
                  className="text-zinc-400 text-xs line-clamp-2"
                /> */}
                <Image src={dropImg} alt="" className="w-full mt-3" />
            </Popover.Dropdown>
        </Popover>

        <Modal opened={opened} onClose={close} centered withCloseButton={false} overlayProps={{
              backgroundOpacity: 0.55,
              blur: 3,
            }} className="relative !overflow-visible" size={"xl"}>
                <div className="flex w-full justify-between items-center">
                    <Title order={5}>Top Watch Details</Title>
                    <div className="flex gap-1 items-center">
                        {trend === "Bullish" ? <IconCaretUpFilled color={"green"}size={'20'} /> :
                        <IconCaretDownFilled color={"red" }size={'20'} /> }
                        <Badge size="md" color="white" variant="light">${ticker}</Badge>
                    </div>
                </div>
                <Divider my={'xs'} opacity={'0.5'} />

                <div className="flex w-full overflow-y-hidden mb-2 maxTab:flex-col">
                    <div className="flex w-1/2 maxTab:w-full maxTab:min-h-[300px]">
                        <TradingViewWidget stock={ticker} />
                    </div>
                    <div className="flex flex-col w-1/2 maxTab:w-full  pl-2">
                        <Title order={6} my={'xs'} className="line-clamp-2">{title}</Title>
                        <div
                          dangerouslySetInnerHTML={{ __html: body }}
                          className="text-zinc-400 mx-2 text-xs"
                        />
                        <Image src={dropImg} alt="" className="w-full mt-3 rounded-md maxTab:hidden" />
                    </div>
                </div>

                <FlowModulex symbol={ticker} src={dropImg} />
                
        </Modal>

        </>
    )
}

export default function TopWatchModal() {
    const [data, setData] = useState<TopWatchData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

    return (
        <div className="flex flex-col h-full justify-center gap-1 maxTab:xhidden">
            <p className="text-[10px] text-zinc-400 text-nowrap maxTab:hidden">Top Watch</p>
            <div className="flex gap-1 h-[60%] items-center hover:gap-7 transition-all">
                {
                    data.length != 0 ?
                    data.map((e, index) => (
                        <TopWatchPopup key={index} className={index != 0 ? " -ml-5" : ""} body={e.body} ticker={e.stock} dropImg={e.img} title={e.title} trend={e.trend} />
                    )) :
                    <p className="text-xs text-nowrap text-zinc-400 maxTab:hidden">Oops ! No Top Watch Data !</p>
                }
            </div>
        </div>
    )
}