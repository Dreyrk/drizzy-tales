import Image from "next/image"
import Link from "next/link.js"
import { BsStarFill } from "react-icons/bs"

import getStarsRating from "../helpers/getStarsRating.js"
import Loader from "./Loader.jsx"
import AddToWatchlistBtn from "./AddToWatchListBtn.jsx"

export default function AnimeBox({ anime, isLoading, isError, watchlist }) {
    const attributes = anime.attributes;
    const poster = attributes.posterImage.tiny;
    const rating = getStarsRating(attributes.averageRating);


    if (anime && !isError && !isLoading) {
        return (
            <div id="anime-box" className="w-[90vw] lg:w-[30vw] bg-secondary h-[156px] grid-box place-items-center rounded-md shadow shadow-violet-500">
                <div className="col-start-1">
                    <Image unoptimized={true} loader={() => poster} width={110} height={156} className={`-translate-y-6 hover:translate-y-0 active:translate-y-0 active:shadow-none shadow-sm shadow-light-black rounded-md`} src={poster} alt={attributes.slug} />
                </div>
                <div className="flex flex-col justify-between w-full h-full col-start-2 py-2 place-self-start">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-sm font-bold max-w-[170px] max-h-[60px] overflow-y-hidden lg:max-w-[245px]" >{attributes.titles.en || attributes.titles.en_jp || attributes.canonicalTitle}</p>
                        {watchlist && <AddToWatchlistBtn watchlist={watchlist} key={anime.id} anime={anime} />}
                    </div>
                    <span className="text-xs font-extralight">{attributes.ageRatingGuide}</span>
                    <span className="text-xs font-extralight">{attributes.status === "finished" ? "Finished" : "Ongoing"}</span>
                    <div className="flex w-full">
                        <div className="grid w-1/4 grid-cols-stars place-items-center" >
                            <BsStarFill size={20} color="#ffea00" />
                            <span className="grid h-full text-xs font-semibold place-content-center place-self-start">{rating ? rating : "Unknown"}</span>
                        </div>
                        <div className="grid w-3/4 place-content-center">
                            <Link href={`anime/${anime.id}`}>
                                <button className="p-[6px] h-8 w-full shadow-sm shadow-violet-900 text-sm font-semibold bg-purple-600 border-none rounded">
                                    Start watch
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (!anime && isLoading) {
        return <Loader />
    } else if (!anime && isError) {
        return <p>{isError}</p>
    }
};