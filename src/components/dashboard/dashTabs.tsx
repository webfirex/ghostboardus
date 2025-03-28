'use client'
import { Button, Menu, rem, Skeleton, Tabs, Tooltip } from "@mantine/core";
import { IconChartCovariate, IconEaseInOutControlPoints, IconFilterFilled, IconInfoCircle, IconMessageCircle, IconPencil, IconPhoto, IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { useMainModules } from "@/data/dashboard/modules";
import ToolSelectDropdown from "./toolSelector";
import { GetLocalData } from "@/lib/localStorage";
import { useUser } from "@/context/UserContext";
import { FlowToolTip } from "../tools/toolTips";

export function MainTab() {
    const tab = 'mainTab'
    const user = useUser();
    const MainModules = useMainModules()
    const [activeModule, setActiveModule] = useState<keyof typeof MainModules>((["flow", "flowai", "gamma", "scanner", "hotFlow", "netgamma", "netFlow", "darkFlow", "darkLevels", "darkPrint"] as const).includes(GetLocalData(tab) as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint") ? (GetLocalData(tab) as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint") : 'flow');
    
    return(
        <div className="flex w-full flex-col bg-zinc-700/5 p-2 rounded-lg min-h-[63%] max-h-[63%] h-full gap-2">
            {user ? <><div className="flex w-full justify-between border-b border-white/5 h-fit items-center">
                <div className="flex w-fit gap-2 items-center">
                    <ToolSelectDropdown activeModule={activeModule} setActiveModule={setActiveModule} tab={tab} />
                    
                    {MainModules[activeModule].displaytooltip && <Tooltip bg={'#ffffff05'} multiline w={350} className=" text-xs text-zinc-400 backdrop-blur-xl " arrowOffset={10} arrowSize={4} label={MainModules[activeModule].tooltip} withArrow position="bottom-start">
                      <button type="button"><IconInfoCircle size={'17px'} stroke={'1'} /></button>
                    </Tooltip>}
                    
                </div>
                <div className="flex gap-2">
                    {MainModules[activeModule].displayFilter2 &&
                        MainModules[activeModule].filter2
                    }
                    {MainModules[activeModule].displayFilter &&
                    <Menu position="bottom-end" withArrow disabled={user?.premium ? false : true}>
                        <Menu.Target>
                            <div className="flex w-fit h-full gap-2">
                                <button type="button" className=" size-[30px] flex justify-center items-center bg-primary rounded-sm">
                                    <IconFilterFilled size={12} className=" text-white" />
                                </button>
                            </div>
                        </Menu.Target>
                        <Menu.Dropdown miw={'200'}>
                          {MainModules[activeModule].filter}
                        </Menu.Dropdown>
                    </Menu> }
                </div>
            </div>
            <div className="flex w-full flex-col gap-1 bg-black/15 p-2 rounded-lg h-[calc(100% - 40px)]" style={{height: 'calc(100% - 40px)'}}>
                {MainModules[activeModule].module}
            </div></> : <>
                <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-[50px] opacity-5" />
                <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-full opacity-5" />
            </>}
        </div>
    )
}

export function DashTab1() {
    const tab = 'dashTab1'
    const user = useUser();
    const MainModules = useMainModules()
    const [activeModule, setActiveModule] = useState<keyof typeof MainModules>((["flow", "flowai", "gamma", "scanner", "hotFlow", "netgamma", "netFlow", "darkFlow", "darkLevels", "darkPrint"] as const).includes(GetLocalData(tab) as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint") ? (GetLocalData(tab) as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint") : 'flowai');
    
    return(
        <div className="flex w-full flex-col bg-zinc-700/5 p-2 rounded-lg h-full gap-2">
            {user ? <><div className="flex w-full justify-between border-b border-white/5 h-fit items-center">
                <div className="flex w-fit gap-2 items-center">
                    <ToolSelectDropdown activeModule={activeModule} setActiveModule={setActiveModule} tab={tab} />
                    {MainModules[activeModule].displaytooltip && <Tooltip bg={'#ffffff05'} multiline w={350} className=" text-xs text-zinc-400 backdrop-blur-xl " arrowOffset={10} arrowSize={4} label={MainModules[activeModule].tooltip} withArrow position="bottom-start">
                      <button type="button"><IconInfoCircle size={'17px'} stroke={'1'} /></button>
                    </Tooltip>}
                </div>
                <div className="flex gap-2">
                    {MainModules[activeModule].displayFilter2 &&
                        MainModules[activeModule].filter2
                    }
                    {MainModules[activeModule].displayFilter &&
                    <Menu position="bottom-end" withArrow disabled={user?.premium ? false : true}>
                        <Menu.Target>
                            <div className="flex w-fit h-full gap-2">
                                <button type="button" className=" size-[30px] flex justify-center items-center bg-primary rounded-sm">
                                    <IconFilterFilled size={12} className=" text-white" />
                                </button>
                            </div>
                        </Menu.Target>
                        <Menu.Dropdown miw={'200'}>
                          {MainModules[activeModule].filter}
                        </Menu.Dropdown>
                    </Menu> }
                </div>
            </div>
            <div className="flex w-full flex-col gap-1 bg-black/15 p-2 rounded-lg h-[calc(100% - 40px)]" style={{height: 'calc(100% - 40px)'}}>
                {MainModules[activeModule].module}
            </div></> : <>
                <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-[50px] opacity-5" />
                <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-full opacity-5" />
            </>}
        </div>
    )
}

export function DashTab2() {
    const tab = 'dashTab2'
    const user = useUser();
    const MainModules = useMainModules()
    const [activeModule, setActiveModule] = useState<keyof typeof MainModules>((["flow", "flowai", "gamma", "scanner", "hotFlow", "netgamma", "netFlow", "darkFlow", "darkLevels", "darkPrint"] as const).includes(GetLocalData(tab) as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint") ? (GetLocalData(tab) as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint") : 'netgamma');
    
    return(
        <div className="flex w-full flex-col bg-zinc-700/5 p-2 rounded-lg h-full gap-2">
            {user ? <><div className="flex w-full justify-between border-b border-white/5 h-fit items-center">
                <div className="flex w-fit gap-2 items-center">
                    <ToolSelectDropdown activeModule={activeModule} setActiveModule={setActiveModule} tab={tab} />

                    {MainModules[activeModule].displaytooltip && <Tooltip bg={'#ffffff05'} multiline w={350} className=" text-xs text-zinc-400 backdrop-blur-xl " arrowOffset={10} arrowSize={4} label={MainModules[activeModule].tooltip} withArrow position="bottom-start">
                      <button type="button"><IconInfoCircle size={'17px'} stroke={'1'} /></button>
                    </Tooltip>}
                </div>
                <div className="flex gap-2">
                    {MainModules[activeModule].displayFilter2 &&
                        MainModules[activeModule].filter2
                    }
                    {MainModules[activeModule].displayFilter &&
                    <Menu position="bottom-end" withArrow disabled={user?.premium ? false : true}>
                        <Menu.Target>
                            <div className="flex w-fit h-full gap-2">
                                <button type="button" className=" size-[30px] flex justify-center items-center bg-primary rounded-sm">
                                    <IconFilterFilled size={12} className=" text-white" />
                                </button>
                            </div>
                        </Menu.Target>
                        <Menu.Dropdown miw={'200'}>
                          {MainModules[activeModule].filter}
                        </Menu.Dropdown>
                    </Menu> }
                </div>
            </div>
            <div className="flex w-full flex-col gap-1 bg-black/15 p-2 rounded-lg h-[calc(100% - 40px)]" style={{height: 'calc(100% - 40px)'}}>
                {MainModules[activeModule].module}
            </div></> : <>
                <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-[50px] opacity-5" />
                <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-full opacity-5" />
            </>}
        </div>
    )
}

export function DashTab3() {
    const tab = 'dashTab3'
    const user = useUser();
    const MainModules = useMainModules()
    const [activeModule, setActiveModule] = useState<keyof typeof MainModules>((["flow", "flowai", "gamma", "scanner", "hotFlow", "netgamma", "netFlow", "darkFlow", "darkLevels", "darkPrint"] as const).includes(GetLocalData(tab) as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint") ? (GetLocalData(tab) as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint") : 'darkPrint');
    
    return(
        <div className="flex w-full flex-col bg-zinc-700/5 p-2 rounded-lg h-1/2 gap-2">
            {user ? <><div className="flex w-full justify-between border-b border-white/5 h-fit items-center">
                <div className="flex max-w-[100px] gap-2 items-center">
                    <ToolSelectDropdown activeModule={activeModule} setActiveModule={setActiveModule} tab={tab} />
                </div>
                <div className="flex gap-2 w-full justify-end">
                    {MainModules[activeModule].displayFilter2 &&
                        MainModules[activeModule].filter2
                    }
                    {MainModules[activeModule].displayFilter &&
                    <Menu position="bottom-end" withArrow disabled={user?.premium ? false : true}>
                        <Menu.Target>
                            <div className="flex w-fit h-full gap-2">
                                <button type="button" className=" size-[30px] flex justify-center items-center bg-primary rounded-sm">
                                    <IconFilterFilled size={12} className=" text-white" />
                                </button>
                            </div>
                        </Menu.Target>
                        <Menu.Dropdown miw={'200'}>
                          {MainModules[activeModule].filter}
                        </Menu.Dropdown>
                    </Menu> }
                </div>
            </div>
            <div className="flex w-full flex-col gap-1 bg-black/15 p-2 rounded-lg h-[calc(100% - 40px)]" style={{height: 'calc(100% - 40px)'}}>
                {MainModules[activeModule].module}
            </div></> : <>
                <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-[50px] opacity-5" />
                <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-full opacity-5" />
            </>}
        </div>
    )
}

export function DashTab4() {
    const tab = 'dashTab4'
    const user = useUser();
    const MainModules = useMainModules()
    const [activeModule, setActiveModule] = useState<keyof typeof MainModules>((["flow", "flowai", "gamma", "scanner", "hotFlow", "netgamma", "netFlow", "darkFlow", "darkLevels", "darkPrint"] as const).includes(GetLocalData(tab) as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint") ? (GetLocalData(tab) as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint") : 'darkLevels');
    
    return(
        <div className="flex w-full flex-col bg-zinc-700/5 p-2 rounded-lg h-1/2 gap-2">
            {user ? <><div className="flex w-full justify-between border-b border-white/5 h-fit items-center">
                <div className="flex max-w-[100px] gap-2 items-center">
                    <ToolSelectDropdown activeModule={activeModule} setActiveModule={setActiveModule} tab={tab} />
                </div>
                <div className="flex gap-2 w-full justify-end">
                    {MainModules[activeModule].displayFilter2 &&
                        MainModules[activeModule].filter2
                    }
                    {MainModules[activeModule].displayFilter &&
                    <Menu position="bottom-end" withArrow disabled={user?.premium ? false : true}>
                        <Menu.Target>
                            <div className="flex w-fit h-full gap-2">
                                <button type="button" className=" size-[30px] flex justify-center items-center bg-primary rounded-sm">
                                    <IconFilterFilled size={12} className=" text-white" />
                                </button>
                            </div>
                        </Menu.Target>
                        <Menu.Dropdown miw={'200'}>
                          {MainModules[activeModule].filter}
                        </Menu.Dropdown>
                    </Menu> }
                </div>
            </div>
            <div className="flex w-full flex-col gap-1 bg-black/15 p-2 rounded-lg h-[calc(100% - 40px)]" style={{height: 'calc(100% - 40px)'}}>
                {MainModules[activeModule].module}
            </div></> : <>
                <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-[50px] opacity-5" />
                <Skeleton radius="md" className="rounded-md w-full justify-between items-center h-full opacity-5" />
            </>}
        </div>
    )
}