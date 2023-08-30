'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function CarouselItem({ anime }) {
    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    const maxCoverHeight = anime.img.cover.meta.dimensions.small.height;
    const poster = screenSize.width < 560 ? anime.img.poster.large : anime.img.cover.large;

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);


        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    return <Image loader={() => poster} height={maxCoverHeight} width={screenSize.width} unoptimized={true} src={poster} alt="carousel-item" />
}