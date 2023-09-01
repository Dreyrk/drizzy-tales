'use client'

import { useState } from "react"
import { usePathname } from "next/navigation";

import Filters from "./Filters";
import HeaderBtn from "./HeaderBtn";

const filtersArray = [
    { name: "New", value: "&sort=popularityRank&filter[status]=current" },
    { name: "Favorites", value: "&sort=ratingRank,-averageRating,-userCount,-favoritesCount,popularityRank" },
    { name: "Broadcast", value: "&sort=-averageRating&filter[status]=current" },
    { name: "Oldest", value: "&sort=createdAt,popularityRank,-averageRating,ratingRank" },
    { name: "Coming", value: "&filter[status]=upcoming" },
    { name: "All", value: "&sort=-canonicalTitle,popularityRank,-averageRating,-userCount,-favoritesCount,ratingRank" }
]


export default function NormalHeader({ title, setSearching, setSort, newUser, setEdit }) {
    const [showFilters, setShowFilters] = useState(false);
    const pathname = usePathname()
    return (
        <header className="w-screen">
            <HeaderBtn setEdit={setEdit} title={title} setSearching={setSearching} pathname={pathname} setShowFilters={setShowFilters} />
            {showFilters && pathname === "/browse" && <Filters filtersArray={filtersArray} setSort={setSort} />}
        </header>
    )
}