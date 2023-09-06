"use client"

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import updateWatchlist from "../serverActions/updateWatchlist";


export default function AddToWatchlistBtn({ anime }) {
    const { status, data: session } = useSession()
    const [added, setAdded] = useState(false);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        async function getData() {
            const userWatchlist = await getUserWatchlist(session?.user.id);
            setWatchlist(userWatchlist);
        }
        getData();
        if (watchlist[0]) {
            setAdded(watchlist.some((el) => el.id === anime.id))
        }
    }, [session, anime, watchlist])


    const handleClick = async () => {
        if (added) {
            setAdded(false);
        } else {
            setAdded(true);
        }
        if (newWatchlist) {
            await updateWatchlist(session?.user.id, newWatchlist);
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