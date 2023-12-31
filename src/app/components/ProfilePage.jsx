'use client'

import Image from "next/image";
import { AiOutlineEye, AiOutlineDownload, AiOutlineQuestionCircle, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai"
import { signOut, useSession } from "next-auth/react";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ProfileLink from "./ProfileLink";
import { useState } from "react";

const links = [
    {
        href: "/profile/watchlist",
        logo: <AiOutlineEye size={20} />,
        text: "Watchlist"
    },
    {
        href: "/profile/download",
        logo: <AiOutlineDownload size={20} />,
        text: "Download"
    },
    {
        href: "/profile/settings",
        logo: <AiOutlineSetting size={20} />,
        text: "Settings"
    },
    {
        href: "/profile/support",
        logo: <AiOutlineQuestionCircle size={20} />,
        text: "Support"
    },
]

export default function ProfilePage() {
    const { data: session } = useSession();
    const [newUser, setNewUser] = useState({ pseudo: session?.user.pseudo, email: session?.user.email })
    const [edit, setEdit] = useState(false);
    const logout = () => {
        signOut()
    }

    return (
        <div className="h-screen">
            <Header newUser={newUser} setEdit={setEdit} edit={edit} />
            <div className="content">
                <div className="grid gap-2 mt-4 place-items-center">
                    <Image width={100} height={100} className="object-contain rounded-full" src={session?.user?.profilePic ? session?.user?.profilePic : "/images/missingPage.jpg"} alt="profile-pic" />
                    {
                        edit ?
                            <>
                                <input type="text" className="w-1/3 text-center text-black" value={newUser.pseudo} onChange={(e) => setNewUser({ ...newUser, pseudo: e.target.value })} />
                                <input type="text" className="w-3/4 text-center text-black" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                            </>
                            :
                            <>
                                <p className="m-0 text-xl font-semibold">{session?.user?.pseudo ? session?.user?.pseudo : "loading..."}</p>
                                <span className="text-xs font-light">{session?.user?.email ? session?.user?.email : "loading..."}</span>
                            </>
                    }
                </div>
                <div className="max-h-[60vh] overflow-auto no-scrollbar mt-4">
                    {links.map((link) => {
                        return <ProfileLink key={link.text} href={link.href} text={link.text} logo={link.logo} />
                    })}
                    <button type="button" onClick={logout} className="flex items-center w-full gap-2 p-8 font-bold text-white hover:text-purple-400 text-start">
                        <AiOutlineLogout size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
            <NavBar />
        </div>
    )
}