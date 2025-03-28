'use client'
import { useEffect, useState } from "react";

export default function StockImage ({ symbol, className } : {symbol: string; className?: string}) {
    const [imageSrc, setImageSrc] = useState('');

    const checkImage = (url: string) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;

            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    };

    const imageUrl = `https://stockmarketlogos.s3.us-west-2.amazonaws.com/ticker-logo/${symbol}.png`;
    checkImage(imageUrl).then((isValid) => {
        setImageSrc(isValid ? imageUrl : '/logo-f-t.png');
    });

    return (
        <img
            src={imageSrc}
            alt={symbol}
            width='24'
            height='24'
            style={{ objectFit: 'cover' }}
            className={className || ''}
        />
    );
};