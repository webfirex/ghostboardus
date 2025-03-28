'use client'
import { useUser } from "@/context/UserContext";
import { MainModules, useMainModules } from "@/data/dashboard/modules";
import { SaveLocalData } from "@/lib/localStorage";
import { Menu } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";

interface ActiveModuleProps {
    activeModule: keyof typeof MainModules;
    setActiveModule: Dispatch<SetStateAction<keyof typeof MainModules>>;
    tab: string;
}

export default function ToolSelectDropdown(props: ActiveModuleProps) {
    const user = useUser();
    const MainModules = useMainModules();

    return (
        <Menu position="bottom-start" withArrow disabled={user?.premium ? false : true}>
            <Menu.Target>
                <button className="flex gap-2 px-4 py-2 items-center justify-between w-[150px] border border-white/5 rounded-t-md border-b-0">
                    <div className="flex gap-2 items-center">
                        {MainModules[props.activeModule].icon}
                        <p className=" text-sm text-nowrap">{MainModules[props.activeModule].name}</p>
                    </div>
                    <IconPencil size={'12'} className={!user?.premium ? " opacity-30 " : ' opacity-70'} />
                </button>
            </Menu.Target>
            <Menu.Dropdown miw={'200'}>
              <Menu.Label>Tools</Menu.Label>
              {
                Object.entries(MainModules).map(([key, module]) => (
                    <>{module.display &&
                    <Menu.Item key={key} leftSection={module.icon} className={props.activeModule === key ? " hidden " : " "} onClick={() => {props.setActiveModule((["flow", "flowai", "gamma", "scanner", "hotFlow", "netgamma", "netFlow", "darkFlow", "darkLevels", "darkPrint", "7scanner"] as const).includes(key as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint" | "7scanner")
                        ? (key as "flow" | "flowai" | "gamma" | "netgamma" | "scanner" | "hotFlow" | "netFlow" | "darkFlow" | "darkLevels" | "darkPrint" | "7scanner")
                        : "flowai"); SaveLocalData(props.tab, key) }}>
                        {module.name}
                    </Menu.Item>}</>
                ))
              }
            </Menu.Dropdown>
        </Menu>
    );
}