import Link from "next/link";

export default function NotPremiumOverlay() {
    return (
        <div className="w-full absolute top-0 h-full left-0 z-10 flex-col flex gap-2 justify-center items-center p-2">
            <div className="w-full h-full bg-black/30 backdrop-blur-md rounded-md flex-col flex gap-2 justify-center items-center p-2">
                <Link href={'/pricing'} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#4F4ACC,45%,#8c86ff,55%,#4F4ACC)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    Upgrade Now
                </Link>
                <p className="text-white text-center">Get Access To Real-Time Data<br />+ 7 Day Free Trial</p>
            </div>
        </div>
    )
}