"use client"

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BiBlock } from "react-icons/bi"
import { useState } from "react";
import { useSession } from "next-auth/react"


export default function AddToWatchlistBtn({ anime }) {
    const { status } = useSession()
    const [added, setAdded] = useState(false);


    const handleClick = () => {
        if (added) {
            setAdded(false)
        } else {
            setAdded(true)
        }
    }
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
        return (
            <button className="no-style-btn" disabled type="button">
                <BiBlock size={20} />
            </button>
        )
    }
}