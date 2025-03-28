'use client'

import { Carousel } from "@mantine/carousel";
import classes from './Carousel.module.css';
import '@mantine/carousel/styles.css';
import { Image } from "@mantine/core";
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from "react";

export default function AuthCarousel() {
    const autoplay = useRef(Autoplay({ delay: 10000 }));

    return (
        <Carousel withIndicators withControls={false} loop classNames={classes} plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}>
          <Carousel.Slide>
            <Image loading="lazy" className=" h-screen" fit="cover" src={"/bg/authBg.jpg"} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image loading="lazy" className=" h-screen" fit="cover" src={"/bg/authBg.jpg"} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image loading="lazy" className=" h-screen" fit="cover" src={"/bg/authBg.jpg"} />
          </Carousel.Slide>
        </Carousel>
    )
}