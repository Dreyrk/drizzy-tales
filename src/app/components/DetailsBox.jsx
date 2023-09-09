import { FaPlay } from "react-icons/fa"
import { BsDot, BsStarFill } from "react-icons/bs"

import getStarsRating from "../helpers/getStarsRating"
import AddToWatchlistBtn from "./AddToWatchListBtn"

export default function DetailsBox({ anime, genres, setPlay, watchlist }) {

    return (
        <div className="m-auto -translate-y-40 z-40 flex flex-col w-[90%] gap-4 p-4 rounded-lg bg-slate-500 h-[320px]">
            <div className="self-end h-0">
                <button onClick={() => setPlay(true)} className="grid no-style-btn w-[60px] h-[60px] bg-red-600 rounded-full place-content-center -translate-y-[52px]">
                    <FaPlay size={30} color="#f4f4f6" />
                </button>
            </div>
            <h1 className="m-0 text-2xl font-bold lg:text-center">{anime?.attributes.titles.en || anime?.attributes.titles.en_jp || anime?.attributes.titles.jp}</h1>
            <div className="flex items-center gap-1 overflow-hidden lg:justify-around">
                <div className="grid overflow-clip place-content-center">
                    <span className="font-light text-xxs ">{anime?.attributes.endDate || anime?.attributes.startDate}</span>
                </div>
                <BsDot size={20} />
                <div className="grid overflow-clip place-content-center">
                    <span className="font-light text-xxs">
                        {genres.map((genre, i) => {
                            if (i !== genres.length - 1) {
                                return `${genre.attributes.name}, `
                            } else {
                                return `${genre.attributes.name}`
                            }
                        })}
                    </span>
                </div>
                <BsDot size={20} />
                <div className="grid overflow-clip place-content-center">
                    <span className="font-light text-xxs ">{anime?.attributes.totalLength} episodes</span>
                </div>
            </div>
            <div className="overflow-hidden h-[50%]">
                <p className="description">{anime?.attributes.description || anime?.attributes.synopsis}</p>
            </div>
            <div className="flex justify-between px-4">
                <span className="flex items-center gap-2 text-base font-semibold">
                    {getStarsRating(anime?.attributes.averageRating)}
                    <BsStarFill size={20} color="rgb(168 85 247)" />
                </span>
                <AddToWatchlistBtn watchlist={watchlist} anime={anime} />
            </div>
        </div>
    )
}