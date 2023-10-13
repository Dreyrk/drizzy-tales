"use client"

import { useEffect, useRef } from "react";
import Message from "./Message";

export default function MessageDisplay({ data }) {
    const ref = useRef(null);
    useEffect(() => {
        if (data.length) {
            ref.current?.lastChild.scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
        }
    }, [data.length]);
    return (
        <div ref={ref} className="h-[74vh] flex flex-col gap-6 p-2 mt-2 mb-2 overflow-auto no-scrollbar">
            {data.map((message) => (<Message key={message._id} message={message} />))}
        </div>
    )
}