'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";

import isActive from "../helpers/isActive.js";

const links = [
    {
        href: "/",
        name: "Home",
        logo: <AiFillHome size={30} />,
    },
    {
        href: "/browse",
        name: "Browse",
        logo: <FaRegEye size={30} />,
    },
    {
        href: "/chat",
        name: "Chat",
        logo: <BsChatDots size={30} />,
    },
    {
        href: "/profile",
        name: "Profile",
        logo: <AiOutlineUser size={30} />,
    },
];

export default function NavBar() {
    const pathname = usePathname()
    return (
        <nav className="fixed left-0 bottom-0 z-50 h-[11vh] w-screen bg-transparent-white">
            <ul className="z-10 flex items-center justify-around w-full h-full backdrop-blur-lg">
                {links.map((link) => {
                    const active = isActive(pathname, link)
                    return (
                        <Link key={link.href} href={link.href} className={`flex z-20 flex-col justify-center items-center gap-2 w-[75px] h-[70%] rounded-lg ${active && "text-slate-100 bg-gradient-to-tl from-indigo-500 via-violet-500 to-purple-600 -translate-y-2 ease-out duration-300 shadow-lg shadow-violet-600"} md:w-[90px] lg:w-[100px]`}>
                            {link.logo}
                            {link.name}
                        </Link>
                    )
                })}
            </ul>
        </nav>
    )
}