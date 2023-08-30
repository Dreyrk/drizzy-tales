'use client'

import { useEffect, useState } from "react";
import useSWRInfinite from 'swr/infinite'

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import AnimeBox from "../components/AnimeBox";
import Loader from "../components/Loader";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_ANIME_API_URL

async function fetcher(url) {
    let res = await fetch(`${BASE_URL}/${url}`)

    if (res.ok) {
        res = await res.json()
        return res.data
    } else {
        console.error("failed to fetch")
    }
};

export default function Page() {
    const limit = 10;
    const [animes, setAnimes] = useState([]);
    const [search, setSearch] = useState("");
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [sort, setSort] = useState("");
    const getKey = (index) => {
        if (index === 0) {
            return `anime?page[limit]=${limit}&page[offset]=0${search && "&filter[text]=" + search}${sort}`;
        } else {
            return `anime?page[limit]=${limit}&page[offset]=${index * limit}${search && "&filter[text]=" + search}${sort}`;
        }
    }
    const { data, size, setSize, isLoading } = useSWRInfinite(getKey, fetcher);

    useEffect(() => {
        //si les data sont présentes alors on les set dans le state animes puis si une page suivante est demandée on fusionne les deux tableaux
        if (data && data[0] && data?.length === 1 && !isLoading) {
            setAnimes([...data[0]])
        } else if (data && data?.length > 1 && !isLoading) {
            setAnimes(animes.concat(...data[size - 1]))
        }
    }, [data]);

    useEffect(() => {
        setLastScrollTop(0)
    }, [sort, search])


    const handleScroll = (e) => {
        //Si l'on arrive en bas de la page alors on actualise size

        //Mobile
        if (e.target.scrollTop >= lastScrollTop + 1200 && e.target.clientWidth < 1025) {
            setSize(size + 1);
            setLastScrollTop(lastScrollTop + 1200);
        }
        //Desktop
        if (e.target.scrollTop >= lastScrollTop + 70 && e.target.clientWidth > 1025) {
            setSize(size + 1);
            setLastScrollTop(lastScrollTop + 70);
        }
    }

    const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < limit);
    const isError = !data && !isEmpty && !isLoading && !isReachingEnd;

    return (
        <div onScroll={handleScroll} className="page no-scrollbar">
            <Header search={search} setSearch={setSearch} setSort={setSort} />
            <div className={`items-center lg:w-screen gap-10 px-3 pt-10 lg:grid lg:grid-cols-3 content no-scrollbar ${!isReachingEnd && !isError && "mb-[12vh]"}`}>
                {animes?.map((anime) => {
                    return <AnimeBox key={anime.id} anime={anime} isError={isError} isLoading={isLoading} />
                })}
                {
                    isLoadingMore && <Loader />
                }
                {
                    isReachingEnd && <p className="w-full text-sm font-semibold text-center text-white">The end</p>
                }
            </div>
            <NavBar />
        </div>
    )
};