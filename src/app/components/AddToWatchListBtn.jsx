"use client"

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from "next-auth/react"
import updateWatchlist from "../serverActions/updateWatchlist";


export default function AddToWatchlistBtn({ anime, watchlist }) {
    const router = useRouter();
    const pathname = usePathname();
    const { status, data: session } = useSession();
    const userId = session?.user.id;
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (Boolean(watchlist)) {
            setAdded(watchlist.animes.some((item) => item.id === anime.id));
        }
    }, [anime.id, watchlist]);

    const handleClick = async () => {
        if (userId) {
            const newWatchlist = await updateWatchlist(userId, anime);
            const isAdded = await newWatchlist.animes.some((el) => el.id === anime.id)
            setAdded(isAdded);
            if (!isAdded && pathname.includes("watchlist")) {
                router.refresh();
            }
        }
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