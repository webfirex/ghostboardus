'use client'
import { useUser } from "@/context/UserContext";
import { convertUtcToEst } from "@/utils/formatDate";
import { Badge, Divider, Modal, Skeleton, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTriangleFilled, IconTriangleInvertedFilled } from "@tabler/icons-react";
import { useState } from "react";

interface AlertCardProps {
    time: string;
    title: string;
    ticker?: string;
    trend?: string;
}

interface AlertProps {
    alerts: any[];
}

function AlertCard({ time, title, ticker, trend }: AlertCardProps) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
        <div className="flex flex-col w-full p-2 rounded-lg bg-zinc-900/50 cursor-pointer" onClick={open}>
            <div className="flex w-full justify-between items-center">
                <p className="text-[10px] line-clamp-1 text-primaryLight">{ticker}</p>
                <p className="text-[10px] line-clamp-1 text-zinc-400">{convertUtcToEst(time)}</p>
            </div>
            <p className="text-xs line-clamp-2">{title}</p>
            {trend && trend != '' && <Badge color={trend?.toLowerCase() === "bullish" ? 'green' : 'red'} size="xs" variant="light" mt={'sm'}>{trend}</Badge>}
        </div>

        <Modal opened={opened} onClose={close} centered withCloseButton={false} overlayProps={{
              backgroundOpacity: 0.55,
              blur: 3,
            }} className="relative !overflow-visible">
                <div className="flex w-full justify-between items-center">
                    <Title order={5}>Alert Details</Title>
                    {/* <div className="flex gap-1 items-center">
                        {trend === "Bullish" ? <IconCaretUpFilled color={"green"}size={'20'} /> :
                        <IconCaretDownFilled color={"red" }size={'20'} /> }
                        <Badge size="md" color="white" variant="light">${ticker}</Badge>
                    </div> */}
                </div>
                <Divider my={'xs'} opacity={'0.5'} />
                <p className="text-zinc-400 mx-2 text-xs">
                    {title}
                </p>
        </Modal>
        </>
    );
}

export default function StreamAlerts(props: AlertProps) {
    const [displayAlerts, setDisplayAlerts] = useState(true)
    const user = useUser();

    return (
        <div className="flex flex-col w-full p-2 rounded-md bg-zinc-400/5 gap-2 transition-all">
            <button className="flex w-full justify-between items-center cursor-pointer" type="button" onClick={() => {displayAlerts ? setDisplayAlerts(false) : setDisplayAlerts(true)}}>
                <Badge size="lg" p={10} color="white" variant="light">Alerts</Badge>
                {!displayAlerts ? <IconTriangleInvertedFilled size={'10'} /> : <IconTriangleFilled size={'10'} />}
            </button>

            {
                displayAlerts && 
                <div className="flex w-full flex-col py-2 border-t border-white/10 h-[300px] overflow-y-scroll gap-2">

                    {user ? props.alerts.length === 0 ? <p className="text-zinc-400 text-xs text-center self-center justify-self-center h-full flex items-center justify-center">No Alerts for Today !</p> : props.alerts.sort((ax, bx) => new Date(bx.time).getTime() - new Date(ax.time).getTime()).map((a, index) => (
                        <AlertCard trend={a.trend} key={index} ticker={a.symbol} title={a.content} time={a.time} />
                    )) : <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-full opacity-5" />}

                </div>
            }

        </div>
    )
}