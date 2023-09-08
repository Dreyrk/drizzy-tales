"use client"

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import updateWatchlist from "../serverActions/updateWatchlist";


export default function AddToWatchlistBtn({ anime, watchlist }) {
    const { status, data: session } = useSession();
    const userId = session?.user.id;
    const [added, setAdded] = useState(false);

    useEffect(() => {
        setAdded(watchlist.animes.some((item) => item.id === anime.id));
    }, [watchlist]);

    const handleClick = async () => {
        const newWatchlist = await updateWatchlist(userId, anime);
        const isAdded = await newWatchlist.animes.some((el) => el.id === anime.id)
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