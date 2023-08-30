'use client'

import { useState } from "react"

export default function Filters({ filtersArray, setSort }) {
    const [selected, setSelected] = useState(null);

    const handleSelect = (i, value) => {
        setSelected(i)
        setSort(value)
    }

    return (
        <div className="w-screen overflow-x-auto border-b border-purple-800 no-scrollbar">
            <div className={`h-14 w-fit z-40 py-2 px-2 flex gap-4 animate-swipe-top-to-bottom`}>
                {filtersArray.map((filter, i) => {
                    return (
                        <button type="button" onClick={() => handleSelect(i, filter.value)} key={filter.name} className={`h-9 p-2 overflow-hidden font-medium grid place-content-center text-lg rounded-3xl ${selected === i ? "bg-red-600 shadow-md -translate-y-1 duration-200 shadow-red-800" : "bg-secondary"}`}>{filter.name}</button>
                    )
                })}
            </div>
        </div>
    )
}