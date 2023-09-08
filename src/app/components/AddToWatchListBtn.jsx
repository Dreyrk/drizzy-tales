"use client"

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import updateWatchlist from "../serverActions/updateWatchlist";
import getUserWatchlist from "../serverActions/getUserWatchlist";
import useWatchlistContext from "../contexts/WatchlistConext";


export default function AddToWatchlistBtn({ anime }) {
    const { status, data: session } = useSession();
    const { watchlist } = useWatchlistContext()
    const userId = session?.user.id;
    const [added, setAdded] = useState(false);

    useEffect(() => {
        async function updateWatchlistData() {
            if (userId) {
                const userWatchlist = await getUserWatchlist(userId);
                setAdded(userWatchlist.some((item) => item.id === anime.id));
            }
        }
        updateWatchlistData();
    }, [userId, anime.id]);

    const handleClick = async () => {
        await updateWatchlist(userId, anime);
        const isAdded = await watchlist.animes.some((el) => el.id === anime.id)
        setAdded(isAdded);
    };

    if (status !== "authenticated") {
        return null;
    }

    return (
        <button onClick={handleClick} type="button" className="no-style-btn w-[25px] h-[25px]">
            {added ? (
                <AiOutlineMinusCircle className="animate-one-spin" size={20} color="#f4f4f6" />
            ) : (
                <AiOutlinePlusCircle className="animate-one-spin" size={20} color="#f4f4f6" />
            )}
        </button>
    );
}