'use client'

import { useSession } from "next-auth/react"
import AnimeBox from "../../components/AnimeBox"
import NavBar from "../../components/NavBar"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/")
        } else {
            return
        }
    }, [status])

    return (
        <div className="page">
            <h1 className="p-4 text-2xl font-bold underline">{session?.user.pseudo ? `${session?.user.pseudo}'s watchlist` : "loading..."}</h1>
            <div className="flex flex-col items-center my-6 content gap-14">
                {
                    session?.user.watchlist.animes[0] ?
                        session?.user.watchlist.animes.map((anime, i) => {
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