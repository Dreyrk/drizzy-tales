"use client"

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"


export default function AddToWatchlistBtn({ anime }) {
    const { status, update, data: session } = useSession()
    const [added, setAdded] = useState(false);

    const watchlist = session?.user.watchlist.animes;

    useEffect(() => {
        if (watchlist) {
            console.log(watchlist)
            setAdded(watchlist.some((el) => el.id === anime.id))
        } else {
            return
        }
    }, [watchlist, anime])


    const handleClick = () => {
        if (added) {
            const newWatchlist = watchlist.filter((el) => el.id !== anime.id);
            update({ watchlist: { animes: newWatchlist } });
            setAdded(false);
        } else {
            const newWatchlist = [...(watchlist || []), anime];
            update({ watchlist: { animes: newWatchlist } });
            setAdded(true);
        }
    };

    if (status === "authenticated") {
        return (
            <button onClick={handleClick} type="button" className="no-style-btn w-[25px] h-[25px]">
                {
                    added ?
                        <AiOutlineMinusCircle className="animate-one-spin" size={20} color="#f4f4f6" />
                        :
                        <AiOutlinePlusCircle className="animate-one-spin" size={20} color="#f4f4f6" />
                }
            </button>
        )
    } else {
        return null
    }
}