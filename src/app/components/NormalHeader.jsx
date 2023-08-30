'use client'

import { useState } from "react"
import { BiFilterAlt } from "react-icons/bi";
import { BsFillCloudDrizzleFill } from "react-icons/bs"
import { FaSearch } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai"
import Link from "next/link";
import { usePathname } from "next/navigation";

import Filters from "./Filters";

const filtersArray = [
    { name: "New", value: "&sort=popularityRank&filter[status]=current" },
    { name: "Favorites", value: "&sort=ratingRank,-averageRating,-userCount,-favoritesCount,popularityRank" },
    { name: "Broadcast", value: "&sort=-averageRating&filter[status]=current" },
    { name: "Oldest", value: "&sort=createdAt,popularityRank,-averageRating,ratingRank" },
    { name: "Coming", value: "&filter[status]=upcoming" },
    { name: "All", value: "&sort=-canonicalTitle,popularityRank,-averageRating,-userCount,-favoritesCount,ratingRank" }
]


export default function NormalHeader({ title, setSearching, setSort }) {
    const [showFilters, setShowFilters] = useState(false);
    const pathname = usePathname()
    return (
        <header className="w-screen">
            <div className="justify-between base-header animate-swipe-left-to-right">
                <button type="button" className="no-style-btn">
                    <BsFillCloudDrizzleFill color="#f4f4f6" size={30} />
                </button>
                <h1 className={`w-[60%] m-0 ${pathname !== "/profile" ? "pl-10" : "pl-4"} text-center text-2xl font-semibold`}>{title}</h1>
                <button onClick={() => setSearching(true)} type="button" className={`no-style-btn ${pathname === "/profile" && "hidden"}`}>
                    <FaSearch size={25} />
                </button>
                {pathname === "/profile" ?
                    <Link href={"/profile/edit"}>
                        <AiOutlineEdit size={30} color="#f4f4f6" />
                    </Link>
                    :
                    <button type="button" onClick={() => setShowFilters(!showFilters)} className={`no-style-btn ${pathname === "/" && "hidden"}`}>
                        <BiFilterAlt size={30} color="#f4f4f6" />
                    </button>
                }
            </div>
            {showFilters && pathname === "/browse" && <Filters filtersArray={filtersArray} setSort={setSort} />}
        </header>
    )
}