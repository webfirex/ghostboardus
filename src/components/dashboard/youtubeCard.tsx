'use client'
import { Image, Title } from "@mantine/core";

interface YoutubeCardProps {
    key?: string | number,
    thumbnail?: string,
    link?: string,
    title?: string,
    description?: string,
}

export default function YoutubeCard(props: YoutubeCardProps) {
    return (
        <div className="flex flex-col rounded-md w-[24%] bg-zinc-400/10 justify-between items-center" key={props.key}>
            <div className="flex flex-col w-full">
                <Image src={props.thumbnail} className="w-full aspect-video rounded-t-md" />
                <div className="flex flex-col w-full p-4 gap-2">
                    <Title order={5} className="line-clamp-2">{props.title}</Title>
                    <p className="text-xs line-clamp-3 text-zinc-400">{props.description}</p>
                </div>
            </div>
            <div className="flex p-2 w-full">
                <a href={props.link} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-primary text-white py-2 text-md font-bold uppercase rounded-md">Watch Now</a>
            </div>
        </div>
    )
}