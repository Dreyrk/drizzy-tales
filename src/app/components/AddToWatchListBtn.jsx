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
    const [added, setAdded] = useState(watchlist.animes ? watchlist.animes.some((item) => item.id === anime.id) : false);

    useEffect(() => {
        if (pathname.includes("watchlist") && anime.id) {
            router.refresh()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    const handleClick = async () => {
        if (userId) {
            const newWatchlist = await updateWatchlist(userId, anime);
            if (newWatchlist.animes) {
                const isAdded = await newWatchlist.animes.some((el) => el.id === anime.id)
                setAdded(isAdded);
                if (!isAdded && pathname.includes("watchlist")) {
                    router.refresh();
                }
            }
        }
    };

    if (status === "unauthenticated" || status === "loading") {
        return null;
    } else if (status === "authenticated") {
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


}