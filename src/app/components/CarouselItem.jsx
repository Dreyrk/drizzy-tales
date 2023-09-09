'use client'

import Image from "next/image";
import useWindowSize from "../hooks/useWindowSize";

export default function CarouselItem({ anime }) {
    const { width: screenWidth } = useWindowSize();
    const maxCoverHeight = anime.img.cover.meta.dimensions.small.height;
    const poster = screenWidth < 560 ? anime.img.poster.large : anime.img.cover.large;

    return (
        <Image
            loader={() => poster}
            height={maxCoverHeight}
            width={screenWidth}
            unoptimized={true}
            src={poster}
            alt="carousel-item"
        />
    )
}