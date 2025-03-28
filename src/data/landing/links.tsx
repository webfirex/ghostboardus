import { IconAdjustmentsDollar, IconAlertSquareRoundedFilled, IconBellRingingFilled, IconBrandParsinta, IconCalendarWeek, IconChartCandle, IconChartCovariate, IconChartScatter, IconChevronsUp, IconCurrency, IconEaseInOutControlPoints, IconInputAi, IconKeyframes, IconLayoutDashboard, IconMessageUser, IconObjectScan, IconReceiptDollar, IconReplace, IconRollercoaster, IconSchema, IconSearch, IconSortAscending2, IconStars, IconTicket, IconTool, IconTools, IconTrendingUp, IconUserCog, IconUserPlus, IconUsers } from '@tabler/icons-react';

export const WebsiteLinks = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'About Us',
        url: '/about'
    },
    {
        name: 'Tools',
        url: '/tools'
    },
    {
        name: 'News',
        url: '/news'
    },
    {
        name: 'Reviews',
        url: '/reviews'
    },
    {
        name: 'Pricing',
        url: '/pricing'
    },
]

export const Sidebar = {
    logo: {
        image: '/logo-f-t.png',
        url: '/dashboard'
    },
    nav: [
        // {
        //     link: true,
        //     name: 'Stocks Search',
        //     icon: <IconSearch size={'19'} />,
        //     url: '/dashboard/stockSearch',
        // },
        {
            link: true,
            name: 'Dashboard',
            icon: <IconLayoutDashboard size={'19'} />,
            url: '/dashboard',
        },
        {
            badge: true,
            color: '#C7ADFF',
            name: 'Tools',
            icon: <IconTool size={'10'} />
        },
        {
            link: true,
            name: 'Flow',
            icon: <IconChartScatter size={'19'} />,
            url: '/dashboard/tools/flow',
        },
        {
            link: true,
            name: 'Flow Ai',
            icon: <IconChartCovariate size={'19'} />,
            url: '/dashboard/tools/flowAi',
            isNew: true
        },
        // {
        //     link: true,
        //     name: 'Order Flow',
        //     icon: <IconSortAscending2 size={'19'} />,
        //     url: '/dashboard/tools/orderFlow',
        // },
        {
            link: true,
            name: 'Dark Pool',
            icon: <IconKeyframes size={'19'} />,
            url: '/dashboard/tools/darkPool',
        },
        {
            link: true,
            name: 'Scanner',
            icon: <IconObjectScan size={'19'} />,
            url: '/dashboard/tools/scanner',
            isNew: true
        },
        {
            link: true,
            name: 'Net Flow',
            icon: <IconChartCandle size={'19'} />,
            url: '/dashboard/tools/netFlow',
        },
        {
            link: true,
            name: 'Gamma',
            icon: <IconEaseInOutControlPoints size={'19'} />,
            url: '/dashboard/tools/gamma',
        },
        // {
        //     link: true,
        //     name: 'Hot Flow',
        //     icon: <IconAdjustmentsDollar size={'19'} />,
        //     url: '/dashboard/tools/hotFlow',
        //     isNew: true
        // },
        // {
        //     link: true,
        //     name: 'Heat Map',
        //     icon: <IconSchema size={'19'} />,
        //     url: '/dashboard/tools/heatMap',
        //     isNew: true
        // },
        {
            link: true,
            name: 'Calendar',
            icon: <IconCalendarWeek size={'19'} />,
            url: '/dashboard/tools/calendar',
            isNew: true
        },
        {
            badge: true,
            color: '#C7ADFF',
            name: 'Education',
            icon: <IconTool size={'10'} />
        },
        {
            link: true,
            name: 'Tutorials',
            icon: <IconBrandParsinta size={'19'} />,
            url: '/dashboard/tutorials',
        },
        {
            link: true,
            name: 'Indicators',
            icon: <IconCurrency size={'19'} />,
            url: '/dashboard/indicators',
        },
        // {
        //     link: true,
        //     name: 'Flow Recap',
        //     icon: <IconReplace size={'19'} />,
        //     url: '/dashboard/x',
        //     isNew: true
        // },
    ]
}

export const AdminSidebar = {
    logo: {
        image: '/logo-f-t.png',
        url: '/admin'
    },
    nav: [
        {
            link: true,
            name: 'Dashboard',
            icon: <IconLayoutDashboard size={'19'} />,
            url: '/admin',
            isNew: false,
            roles: ['owner', 'admin']
        },
        {
            badge: true,
            color: '#C7ADFF',
            name: 'Management',
            icon: <IconTool size={'10'} />, 
            roles: ['owner', 'admin', 'staff']
        },
        {
            link: true,
            name: 'All Users',
            icon: <IconUsers size={'19'} />,
            url: '/admin/manage/allUsers',
            roles: ['owner', 'admin', 'staff']
        },
        {
            link: true,
            name: 'All Tools',
            icon: <IconTools size={'19'} />,
            url: '/admin/manage/allTools',
            roles: ['owner', 'admin', 'staff']
        },
        {
            link: true,
            name: 'Ticker Tape',
            icon: <IconRollercoaster size={'19'} />,
            url: '/admin/manage/tickers',
            roles: ['owner', 'admin', 'staff']
        }, 
        {
            link: true,
            name: 'Mag7 Scanner',
            icon: <IconRollercoaster size={'19'} />,
            url: '/admin/manage/mag7scanner',
            roles: ['owner', 'admin', 'staff']
        }, 
        {
            link: true,
            name: 'Top Watch',
            icon: <IconChevronsUp size={'19'} />,
            url: '/admin/manage/topwatch',
            roles: ['owner', 'admin', 'staff']
        },
        {
            link: true,
            name: 'Alerts',
            icon: <IconAlertSquareRoundedFilled size={'19'} />,
            url: '/admin/manage/alerts',
            roles: ['owner', 'admin', 'staff']
        },
        // {
        //     link: true,
        //     name: 'Notifications',
        //     icon: <IconBellRingingFilled size={'19'} />,
        //     url: '/admin/manage/notifications',
        // },
        {
            link: true,
            name: 'Support',
            icon: <IconTicket size={'19'} />,
            url: '/admin/manage/support',
            roles: ['owner', 'admin', 'staff']
        },
        // {
        //     badge: true,
        //     color: '#C7ADFF',
        //     name: 'Billing',
        //     icon: <IconReceiptDollar size={'10'} />
        // },
        // {
        //     link: true,
        //     name: 'Subscriptions',
        //     icon: <IconUserPlus size={'19'} />,
        //     url: '/admin/billing/',
        // },
        {
            badge: true,
            color: '#C7ADFF',
            name: 'Affiliate',
            icon: <IconUserCog size={'10'} />,
            roles: ['owner', 'affiliate', 'admin']
        },
        {
            link: true,
            name: 'Affiliate Stats',
            icon: <IconStars size={'19'} />,
            url: '/admin/affiliate/',
            roles: ['owner', 'affiliate', 'admin']
        },
        {
            badge: true,
            color: '#C7ADFF',
            name: 'Staff',
            icon: <IconUserCog size={'10'} />,
            roles: ['owner']
        },
        {
            link: true,
            name: 'Staff Accounts',
            icon: <IconStars size={'19'} />,
            url: '/admin/staff/',
            roles: ['owner']
        },
    ]
}