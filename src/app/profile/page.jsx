"use client"

import NavBar from "../components/NavBar"
import ProfilePage from "../components/ProfilePage"
import ProfileAuth from "../components/ProfileAuth"
import { useSession } from "next-auth/react"
import Loader from "../components/Loader"

export default function Page() {
    const { status } = useSession();
    if (status === "authenticated") {
        return (
            <ProfilePage />
        )
    } else if (status === "loading") {
        return (
            <div className="grid h-screen place-content-center">
                <Loader size={20} />
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center h-[85vh] gap-6">
                <ProfileAuth />
                <NavBar />
            </div>
        )
    }
}