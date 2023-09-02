import React from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { BsFillCloudDrizzleFill } from "react-icons/bs"
import { FaSearch } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai"
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
                <h1 className={`m-0 text-center text-2xl font-semibold`}>{title}</h1>
                {
                    !edit ?
                        <button onClick={updatePseudo}>
                            <AiOutlineEdit size={30} color="#f4f4f6" />
                        </button>
                        :
                        <button onClick={updatePseudo}>
                            <AiOutlineCheck size={30} color="#f4f4f6" />
                        </button>
                }
            </div>
        )
    } else if (pathname === "/browse") {
        return (
            <div className="justify-between base-header animate-swipe-left-to-right">
                <button type="button" className="no-style-btn">
                    <BsFillCloudDrizzleFill color="#f4f4f6" size={30} />
                </button>
                <h1 className={`m-0 pl-6 text-center text-2xl font-semibold`}>{title}</h1>
                <div className='flex gap-2'>
                    <button onClick={() => setSearching(true)} type="button" className={`no-style-btn`}>
                        <FaSearch size={25} />
                    </button>
                    <button type="button" onClick={() => setShowFilters((prev) => !prev)} className={`no-style-btn ${pathname === "/" && "hidden"}`}>
                        <BiFilterAlt size={30} color="#f4f4f6" />
                    </button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="justify-between base-header animate-swipe-left-to-right">
                <button type="button" className="no-style-btn">
                    <BsFillCloudDrizzleFill color="#f4f4f6" size={30} />
                </button>
                <h1 className={`m-0 text-center text-2xl font-semibold`}>{title}</h1>
                <button onClick={() => setSearching(true)} type="button" className={`no-style-btn`}>
                    <FaSearch size={25} />
                </button>
            </div>
        )
    }
}

export default HeaderBtn
