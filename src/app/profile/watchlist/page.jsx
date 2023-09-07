'use client'

import { useSession } from "next-auth/react";
import AnimeBox from "../../components/AnimeBox";
import NavBar from "../../components/NavBar";
import { useEffect } from "react";
import getUserWatchlist from "@/app/serverActions/getUserWatchlist";
import useWatchlistContext from "@/app/contexts/WatchlistConext";


export default function Page() {
    const { data: session, status } = useSession();
    const { watchlist } = useWatchlistContext();

    console.log(watchlist)

    return (
        <div className="page">
            <h1 className="p-4 text-2xl font-bold underline">
                {session?.user.pseudo ? `${session?.user.pseudo}'s watchlist` : "loading..."}
            </h1>
            <div className="flex flex-col items-center my-6 content gap-14">
                {watchlist.animes.length > 0 ? (
                    watchlist.animes.map((anime, i) => (
                        <AnimeBox anime={anime} key={i} />
                    ))
                ) : (
                    <div className="grid w-full p-6 h-96 place-content-center">
                        <h1 className="text-2xl font-extrabold text-center text-white">
                            Add animes to your Watchlist to see them here
                        </h1>
                    </div>
                )}
            </div>
            <NavBar />
        </div>
    );
}
