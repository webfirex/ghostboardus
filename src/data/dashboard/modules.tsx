'use client'
import DarkAiChart from "@/components/dashboard/charts/darkAiChart";
import GammaChart from "@/components/dashboard/charts/gammaChart";
// import NetFlowChart from "@/components/dashboard/charts/netFlowChart";
import DarkLevelsModule from "@/components/tools/darkpool/levels";
import DarkPrintssModule from "@/components/tools/darkpool/prints";
import FlowFilter from "@/components/tools/flow/filter";
import FlowModule from "@/components/tools/flow/main";
import FlowAiFilter from "@/components/tools/flowAi/filter";
import FlowAiModule from "@/components/tools/flowAi/main";
import HotFlowModule from "@/components/tools/hotFlow/main";
import Mag7ScannerModule from "@/components/tools/scanner/mag7/main";
import ScannerModule from "@/components/tools/scanner/main";
import { DarkAiFilter, DarkLevelsFilter, DarkPrintsFilter, FlowAiSearchFilter, FlowSearchFilter, GammaStocksFilter, NetFlowFilter, ScannerFilter, SearchFilter } from "@/components/tools/sideFilter";
import { FlowAiToolTip, FlowToolTip } from "@/components/tools/toolTips";
import { useUser } from "@/context/UserContext";
import { GetLocalData, SaveLocalData } from "@/lib/localStorage";
import { IconAdjustmentsDollar, IconChartCovariate, IconChartScatter, IconEaseInOutControlPoints, IconKeyframes, IconObjectScan } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SingleLineChart = dynamic(() => import('@/components/dashboard/charts/singleLine'), {
    ssr: false,
});

const NetFlowChart = dynamic(() => import('@/components/dashboard/charts/netFlowChart'), { 
    ssr: false 
});

export const MainModules = {
    'flow' : {
        name: 'Flow',
        icon: <IconChartScatter size={'12'} />,
        module: <FlowModule />,
        active: true,
        display: true,
        filter: <FlowFilter />,
        filter2: null,
        displayFilter: true,
        displayFilter2: true,
        tooltip: <FlowToolTip />,
        displaytooltip: true,
    },
    'flowai' : {
        name: 'Flow AI',
        icon: <IconChartCovariate size={'12'} />,
        module: <FlowAiModule />,
        active: true,
        display: true,
        filter: <FlowAiFilter />,
        filter2: <SearchFilter />,
        displayFilter: true,
        displayFilter2: true,
        tooltip: <FlowAiToolTip />,
        displaytooltip: true,
    },
    'gamma' : {
        name: 'Gamma',
        icon: <IconEaseInOutControlPoints size={'12'} />,
        module: <GammaChart />,
        active: true,
        display: false,
        filter: null,
        filter2: null,
        displayFilter: false,
        displayFilter2: false,
        tooltip: null,
        displaytooltip: false
    },
    'netgamma' : {
        name: 'Net Gamma',
        icon: <IconEaseInOutControlPoints size={'12'} />,
        module: <GammaChart />,
        active: true,
        display: true,
        filter: null,
        filter2: null,
        displayFilter: false,
        displayFilter2: false,
        tooltip: null,
        displaytooltip: false
    },
    'scanner' : {
        name: 'Scanner',
        icon: <IconObjectScan size={'12'} />,
        module: <ScannerModule />,
        active: true,
        display: true,
        filter: null,
        filter2: null,
        displayFilter: false,
        displayFilter2: false,
        tooltip: null,
        displaytooltip: false
    },
    '7scanner' : {
        name: 'Scanner',
        icon: <IconObjectScan size={'12'} />,
        module: <Mag7ScannerModule />,
        active: true,
        display: true,
        filter: null,
        filter2: null,
        displayFilter: false,
        displayFilter2: false,
        tooltip: null,
        displaytooltip: false
    },
    'hotFlow' : {
        name: 'Hot Flow',
        icon: <IconAdjustmentsDollar size={'12'} />,
        module: <HotFlowModule />,
        active: true,
        display: false,
        filter: null,
        filter2: null,
        displayFilter: false,
        displayFilter2: false,
        tooltip: null,
        displaytooltip: false
    },
    'netFlow': {
        name: 'Net Flow',
        icon: <IconAdjustmentsDollar size={'12'} />,
        module: <NetFlowChart />,
        active: true,
        display: false,
        filter: null,
        filter2: null,
        displayFilter: false,
        displayFilter2: false,
        tooltip: null,
        displaytooltip: false
    },
    'darkFlow': {
        name: 'Dark Flow',
        icon: <IconKeyframes size={'12'} />,
        module: <SingleLineChart />,
        active: true,
        display: true,
        filter: null,
        filter2: null,
        displayFilter: false,
        displayFilter2: false,
        tooltip: null,
        displaytooltip: false
    },
    'darkLevels' : {
        name: 'Dark Levels',
        icon: <IconKeyframes size={'12'} />,
        module: <HotFlowModule />,
        active: true,
        display: true,
        filter: null,
        filter2: null,
        displayFilter: false,
        displayFilter2: false,
        tooltip: null,
        displaytooltip: false
    },
    'darkPrint' : {
        name: 'Dark Print',
        icon: <IconKeyframes size={'12'} />,
        module: <HotFlowModule />,
        active: true,
        display: true,
        filter: null,
        filter2: null,
        displayFilter: false,
        displayFilter2: false,
        tooltip: null,
        displaytooltip: false
    },
}

export const useMainModules = () => {
    const [flowSearch, setFlowSearch] = useState<string>('');
    const [flowAiSearch, setFlowAiSearch] = useState<string>('');
    const [gammaStock, setGammaStock] = useState<string | null>('SPY');
    const [NetFlowStock, setNetFlowStock] = useState<string | null>('SPY');
    const [DarkAIStock, setDarkAIStock] = useState<string | null>('SPY');
    const [darkPrints, setdarkPrints] = useState<string | null>('SPY');
    const [pages, setPages] = useState<number>(0);
    const [flowDate, setFlowDate] = useState<[Date | null, Date | null]>([null, null]);
    const [flowAiDate, setFlowAiDate] = useState<[Date | null, Date | null]>([null, null]);
    const user = useUser()

    const [flowAiFilters, setFlowAiFilters] = useState(() => {
        const savedFilters = GetLocalData("flowAiFilters");
        return savedFilters ? JSON.parse(savedFilters) : {
            Put: true,
            Call: true,
            Repeat: true,
            Heavy: true,
            Golden: true,
            hgp: false,
            lgp: true,
        };
    });

    useEffect(() => {
        SaveLocalData("flowAiFilters", JSON.stringify(flowAiFilters));
    }, [flowAiFilters]);

    const [FlowFilters, setFlowFilters] = useState(() => {
        // Retrieve from localStorage or use default values
        const savedFilters = GetLocalData("FlowFilters");
        return savedFilters ? JSON.parse(savedFilters) : {
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
        };
    });

    // Update localStorage whenever FlowFilters changes
    useEffect(() => {
        SaveLocalData("FlowFilters", JSON.stringify(FlowFilters));
    }, [FlowFilters]);

    const [scannerFilters, setScannerFilters] = useState({
        type: 'Inside',
        interval: 'Daily'
    })

    const [darkLvlFilters, setDarkLvlFilters] = useState({
        symbol: 'SPY',
        interval: 'Daily'
    })

    const [darkAIFilters, setDarkAIFilters] = useState({
        symbol: 'SPY',
        interval: 'Daily'
    })

    const setFlowAiFilter = (key: string, value: any) => {
        setFlowAiFilters((prev: any) => ({ ...prev, [key]: value }));
    };

    const setFlowFilter = (key: string, value: any) => {
        setFlowFilters((prev: any) => ({ ...prev, [key]: value }));
    };

    const setScannerFilter = (key: string, value: any) => {
        setScannerFilters((prev) => ({ ...prev, [key]: value }));
    };

    const setDarkLvlFilter = (key: string, value: any) => {
        setDarkLvlFilters((prev) => ({ ...prev, [key]: value }));
    };

    const setDarkAIFilter = (key: string, value: any) => {
        setDarkAIFilters((prev) => ({ ...prev, [key]: value }));
    };

    const MainModules = {
        'flow': {
            name: 'Flow',
            icon: <IconChartScatter size={'12'} />,
            module: <FlowModule filters={FlowFilters} symbol={flowSearch} pages={pages} setPages={setPages} dates={flowDate} />,
            active: true,
            display: true,
            filter: <FlowFilter filters={FlowFilters} pages={pages} setFilter={setFlowFilter} />,
            filter2: !user?.premium ? null : <FlowSearchFilter page={FlowFilters.page} pages={pages} setPage={setFlowFilter} search={flowSearch} setSearch={setFlowSearch} flowDate={flowDate} setFlowDate={setFlowDate} />,
            displayFilter: true,
            displayFilter2: true,
            tooltip: <FlowToolTip />,
            displaytooltip: true,
        },
        'flowai': {
            name: 'Flow AI',
            icon: <IconChartCovariate size={'12'} />,
            module: <FlowAiModule filters={flowAiFilters} symbol={flowAiSearch} dates={flowAiDate} />,
            active: true,
            display: true,
            filter: <FlowAiFilter filters={flowAiFilters} setFilter={setFlowAiFilter} />,
            filter2: !user?.premium ? null : <FlowAiSearchFilter search={flowAiSearch} setSearch={setFlowAiSearch} setFlowDate={setFlowAiDate} flowDate={flowAiDate} />,
            displayFilter: true,
            displayFilter2: true,
            tooltip: <FlowAiToolTip />,
            displaytooltip: true,
        },
        'gamma': {
            name: 'Gamma',
            icon: <IconEaseInOutControlPoints size={'12'} />,
            module: <GammaChart />,
            active: true,
            display: false,
            filter: null,
            filter2: !user?.premium ? null : null,
            displayFilter: false,
            displayFilter2: false,
            tooltip: null,
            displaytooltip: false
        },
        'netgamma': {
            name: 'Net Gamma',
            icon: <IconEaseInOutControlPoints size={'12'} />,
            module: <GammaChart symbol={gammaStock} />,
            active: true,
            display: true,
            filter: null,
            filter2: !user?.premium ? null : <GammaStocksFilter value={gammaStock} setValue={setGammaStock} />,
            displayFilter: false,
            displayFilter2: true,
            tooltip: null,
            displaytooltip: false
        },
        'scanner': {
            name: 'Scanner',
            icon: <IconObjectScan size={'12'} />,
            module: <ScannerModule filters={scannerFilters} />,
            active: true,
            display: true,
            filter: null,
            filter2: !user?.premium ? null : <ScannerFilter filters={scannerFilters} setFilter={setScannerFilter} />,
            displayFilter: false,
            displayFilter2: true,
            tooltip: null,
            displaytooltip: false
        },
        '7scanner': {
            name: 'Mag 7',
            icon: <IconObjectScan size={'12'} />,
            module: <Mag7ScannerModule filters={scannerFilters} />,
            active: true,
            display: true,
            filter: null,
            filter2: null,
            displayFilter: false,
            displayFilter2: false,
            tooltip: null,
            displaytooltip: false
        },
        'hotFlow': {
            name: 'Hot Flow',
            icon: <IconAdjustmentsDollar size={'12'} />,
            module: <HotFlowModule />,
            active: true,
            display: false,
            filter: null,
            filter2: !user?.premium ? null : null,
            displayFilter: false,
            displayFilter2: false,
            tooltip: null,
            displaytooltip: false
        },
        'netFlow': {
            name: 'Net Flow',
            icon: <IconAdjustmentsDollar size={'12'} />,
            module: <NetFlowChart symbol={NetFlowStock} />,
            active: true,
            display: true,
            filter: null,
            filter2: !user?.premium ? null : <NetFlowFilter value={NetFlowStock} setValue={setNetFlowStock} />,
            displayFilter: false,
            displayFilter2: true,
            tooltip: null,
            displaytooltip: false
        },
        'darkFlow': {
            name: 'Dark Pool AI',
            icon: <IconKeyframes size={'12'} />,
            module: <DarkAiChart filters={darkAIFilters} />,
            active: true,
            display: true,
            filter: null,
            filter2: !user?.premium ? null : <DarkAiFilter filters={darkAIFilters} setFilter={setDarkAIFilter} />,
            displayFilter: false,
            displayFilter2: true,
            tooltip: null,
            displaytooltip: false
        },
        'darkLevels' : {
            name: 'Top DP Levels',
            icon: <IconKeyframes size={'12'} />,
            module: <DarkLevelsModule filters={darkLvlFilters} />,
            active: true,
            display: true,
            filter: null,
            filter2: !user?.premium ? null : <DarkLevelsFilter filters={darkLvlFilters} setFilter={setDarkLvlFilter} />,
            displayFilter: false,
            displayFilter2: true,
            tooltip: null,
            displaytooltip: false
        },
        'darkPrint' : {
            name: 'Dark Pool',
            icon: <IconKeyframes size={'12'} />,
            module: <DarkPrintssModule symbol={darkPrints} />,
            active: true,
            display: true,
            filter: null,
            filter2: !user?.premium ? null : <DarkPrintsFilter value={darkPrints} setValue={setdarkPrints} />,
            displayFilter: false,
            displayFilter2: true,
            tooltip: null,
            displaytooltip: false
        },
    };

    return MainModules;
};