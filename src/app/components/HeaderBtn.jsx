import React from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { BsFillCloudDrizzleFill } from "react-icons/bs"
import { FaSearch } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai"
import { useSession } from 'next-auth/react';

function HeaderBtn({ pathname, title, setSearching, setShowFilters, newUser, setEdit, edit }) {
    const { update } = useSession();
    const updatePseudo = () => {
        if (!edit) {
            setEdit(true)
        } else {
            update(newUser)
            setEdit(false)
        }
    }
    if (pathname === "/profile") {
        return (
            <div className="justify-between base-header animate-swipe-left-to-right">
                <button type="button" className="no-style-btn">
                    <BsFillCloudDrizzleFill color="#f4f4f6" size={30} />
                </button>
                <h1 className={`w-[60%] m-0 ${pathname !== "/profile" ? "pl-10" : "pl-4"} text-center text-2xl font-semibold`}>{title}</h1>
                <button onClick={updatePseudo}>
                    <AiOutlineEdit size={30} color="#f4f4f6" />
                </button>
            </div>
        )
    } else {
        return (
            <div className="justify-between base-header animate-swipe-left-to-right">
                <button type="button" className="no-style-btn">
                    <BsFillCloudDrizzleFill color="#f4f4f6" size={30} />
                </button>
                <h1 className={`w-[60%] m-0 ${pathname !== "/profile" ? "pl-10" : "pl-4"} text-center text-2xl font-semibold`}>{title}</h1>
                <button onClick={() => setSearching(true)} type="button" className={`no-style-btn`}>
                    <FaSearch size={25} />
                </button>
                <button>
                    <AiOutlineEdit size={30} color="#f4f4f6" />
                </button>
                <button type="button" onClick={() => setShowFilters(!showFilters)} className={`no-style-btn ${pathname === "/" && "hidden"}`}>
                    <BiFilterAlt size={30} color="#f4f4f6" />
                </button>
            </div>
        )
    }
}

export default HeaderBtn
