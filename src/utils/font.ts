import { Montserrat, Overpass, Manrope, Inter } from 'next/font/google';

export const manrope = Manrope({
    subsets: ['latin'],
    weight: ['200','300','400','500','600','700','800']
});

export const inter = Inter({
    subsets: ['latin'],
    weight: ['100','200','300','400','500','600','700','800','900']
});

export const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export const overpass = Overpass({
    subsets: ['latin'],
    weight: ['400', '700'],
});