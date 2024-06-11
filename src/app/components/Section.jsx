'use client'

import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"

import useFetch from "../hooks/useFetch";
import AnimeCard from "./AnimeCard";

export default function Section({ category }) {
    const [hide, setHide] = useState(false);
    const { data, isLoading, isError } = useFetch(category.url)

    return (
        <section className={`no-scrollbar ${category.last && "mb-[11vh]"} ${hide && "hidden-section"}`}>
            <div className="z-30 flex justify-between max-w-full px-3">
                <h2 className="grid text-2xl font-semibold place-content-center">{category.name}</h2>
                <button onClick={() => setHide(!hide)} type="button" className="w-[25px] h-full">
                    {hide ?
                        <AiOutlinePlusCircle size={20} color="#f4f4f6" />
                        :
                        <AiOutlineMinusCircle size={20} color="#f4f4f6" />
                    }
                </button>
            </div>
            <div className={`flex px-3 gap-6 overflow-y-hidden overflow-x-auto no-scrollbar min-h-fit w-screen ${!hide ? "animate-swipe-top-to-bottom-enter" : "hidden"}`}>
                {data?.map((anime) => {
                    return <AnimeCard key={anime.id} id={anime.id} anime={anime.attributes} isLoading={isLoading} isError={isError} />
                })}
            </div>
        </section>
    )
};