"use client"

import { useSession } from "next-auth/react";
import AnimeBox from "./AnimeBox";
import LoginError from "./LoginError";
import Loader from "./Loader";


function Watchlist({ watchlist }) {
    const { data: session, status } = useSession();

    if (status === "unauthenticated") {
        return (
            <LoginError />
        )
    } else if (status === "loading") {
        return (
            <Loader />
        )
    } else if (status === "authenticated") {
        return (
            <>
                <div className="mb-6">
                    <h1 className="p-4 text-2xl font-bold underline">
                        {session?.user.pseudo ? `${session?.user.pseudo}'s watchlist` : "loading..."}
                    </h1>
                    <span className="ml-4 text-sm font-light" >Animes in Watchlist : {watchlist.animes.length}</span>
                </div>
                <div className="flex flex-col items-center lg:grid lg:grid-cols-3 gap-10 place-items-start min-h-[85vh] my-12">
                    {watchlist ? (
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
}

export default Watchlist;
