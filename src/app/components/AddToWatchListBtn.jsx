"use client"

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import updateWatchlist from "../serverActions/updateWatchlist";
import getUserWatchlist from "../serverActions/getUserWatchlist";


export default function AddToWatchlistBtn({ anime }) {
    const { status, data: session } = useSession();
    const [added, setAdded] = useState(false);
    const [watchlist, setWatchlist] = useState([]);

    const userId = session?.user.id;

    useEffect(() => {
        async function fetchData() {
            if (userId) {
                const userWatchlist = await getUserWatchlist(userId);
                setWatchlist(userWatchlist);
            }
        }

        fetchData();
        if (Boolean(watchlist)) {
            setAdded(watchlist.some((el) => el.id === anime.id))
        }
    }, [])


    const handleClick = async () => {
        if (added) {
            setAdded(false);
        } else {
            setAdded(true);
        }
        const newWatchlist = await updateWatchlist(userId, anime);
        console.log(newWatchlist)
        setWatchlist(newWatchlist);
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