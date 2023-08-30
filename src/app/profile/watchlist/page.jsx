'use client'

import AnimeBox from "../../components/AnimeBox"
import NavBar from "../../components/NavBar"
import { useCurrentUserContext } from "../../context/userContext"

export default function Page() {
    const { user } = useCurrentUserContext();
    return (
        <div className="page">
            <h1 className="p-4 text-2xl font-bold underline">{user.pseudo ? `${user.pseudo}'s watchlist` : "loading..."}</h1>
            <div className="flex flex-col items-center my-6 content gap-14">
                {
                    user.watchlist?.animes[0] ?
                        user.watchlist.animes.map((anime, i) => {
                            return <AnimeBox anime={anime} key={i} />
                        })
                        :
                        <div className="grid w-full p-6 h-96 place-content-center">
                            <h1 className="text-2xl font-extrabold text-center text-white">Add animes to your Watchlist to see them here</h1>
                        </div>
                }
            </div>
            <NavBar />
        </div>
    )
}