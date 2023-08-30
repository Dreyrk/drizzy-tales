import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function SearchHeader({ setSearching, setSearch, search }) {
    const closeSearch = () => {
        setSearching(false)
        setSearch("")
    }
    return (
        <header>
            <div className="justify-around base-header animate-swipe-right-to-left">
                <button onClick={closeSearch} type="button" className={`no-style-btn animate-one-spin`}>
                    <MdClose size={30} />
                </button>
                <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="p-1 w-[60%] text-light-black rounded-lg focus:outline-purple-700 focus:caret-purple-600" />
                <button type="button" className="no-style-btn">
                    <FaSearch size={25} />
                </button>
            </div>
        </header>
    )
}