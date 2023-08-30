'use client'
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function ProfileAuth() {
    const [registered, setRegistered] = useState(false)
    if (registered) {
        return (
            <>
                <Login />
                <button onClick={() => setRegistered(false)} type="button" className="underline no-style-btn hover:text-purple-600">No Account yet ?</button>
            </>
        )
    } else {
        return (
            <>
                <Register setRegistered={setRegistered} />
                <button onClick={() => setRegistered(true)} type="button" className="underline no-style-btn hover:text-purple-600">Already Registered ?</button>
            </>
        )
    }
}