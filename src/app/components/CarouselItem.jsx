'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function CarouselItem({ anime }) {
    function getCurrentDimension() {
        if (typeof window !== 'undefined') {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        } else {
            return 0
        }
    }
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    const maxCoverHeight = anime.img.cover.meta.dimensions.small.height;
    const poster = screenSize.width < 560 ? anime.img.poster.large : anime.img.cover.large;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateDimension = () => {
                setScreenSize(getCurrentDimension())
            }
            window.addEventListener('resize', updateDimension);


            return (() => {
                window.removeEventListener('resize', updateDimension);
            })
        } else {
            return
        }
    }, [screenSize])

    return <Image loader={() => poster} height={maxCoverHeight} width={screenSize.width} unoptimized={true} src={poster} alt="carousel-item" />
}