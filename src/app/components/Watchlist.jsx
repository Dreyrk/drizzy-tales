"use client"

import { useSession } from "next-auth/react";
import AnimeBox from "./AnimeBox";


function Watchlist({ watchlist }) {
    const { data: session } = useSession();

    return (
        <>
            <h1 className="p-4 text-2xl font-bold underline">
                {session?.user.pseudo ? `${session?.user.pseudo}'s watchlist` : "loading..."}
            </h1>
            <div className="flex flex-col items-center my-6 content gap-14">
                {watchlist.animes[0] !== undefined ? (
                    watchlist.animes.map((anime, i) => (
                        <AnimeBox watchlist={watchlist} anime={anime} key={i} />
                    ))
                ) : (
                    <div className="grid w-full p-6 h-96 place-content-center">
                        <h1 className="text-2xl font-extrabold text-center text-white">
                            Add animes to your Watchlist to see them here
                        </h1>
                    </div>
                )}
            </div>
        </>
    )
}

export default Watchlist
