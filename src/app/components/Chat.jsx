"use client"

import { useSession } from "next-auth/react";
import { useState } from "react"
import Loader from "./Loader";
import LoginError from "./LoginError";
import Header from "./Header";

export default function Chat() {
    const { data: session, status } = useSession();
    const [edit, setEdit] = useState(false);
    const [message, setMessage] = useState({
        text: "",
        user: {
            id: ""
        }
    });

    const handleTyping = (e) => {
        if (message.user.id && session) {
            setMessage((prev) => ({ ...prev, text: e.target.value }))
        } else {
            setMessage((prev) => ({ user: { ...session?.user }, text: e.target.value }))
        }
        console.log(message)
    }
    if (status === "unauthenticated") {
        return (
            <>
                <Header edit={edit} setEdit={setEdit} />
                <LoginError />
            </>
        )
    } else if (status === "loading") {
        return (
            <div className="grid place-content-center">
                <Loader />
            </div>
        )
    } else if (status === "authenticated") {
        return (
            <>
                <Header edit={edit} setEdit={setEdit} />
                <div className="content">
                    <div>

                    </div>
                    <div>
                        <input onChange={handleTyping} type="text" />
                        <button type="button">Send</button>
                    </div>
                </div>
            </>
        )
    }
};
