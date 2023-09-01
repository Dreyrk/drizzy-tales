'use client'

import { useState } from "react";
import { usePathname } from "next/navigation";

import NormalHeader from "./NormalHeader";
import SearchHeader from "./SearchHeader";


export default function Header({ setSort, search, setSearch, newUser, setEdit, edit }) {
    const [searching, setSearching] = useState(false);

    const pathname = usePathname();

    switch (pathname) {
        case "/browse":
            if (searching) {
                return (
                    <SearchHeader setSearch={setSearch} setSearching={setSearching} search={search} />
                )
            } else {
                return (
                    <NormalHeader newUser={newUser} setSort={setSort} title={"Browse"} setSearching={setSearching} />
                )
            }
        case "/chat":
            if (searching) {
                return (
                    <SearchHeader setSearch={setSearch} setSearching={setSearching} search={search} />
                )
            } else {
                return (
                    <NormalHeader setSort={setSort} title={"Chat"} setSearching={setSearching} />
                )
            }
        case "/profile":
            if (searching) {
                return (
                    <SearchHeader setSearch={setSearch} setSearching={setSearching} search={search} />
                )
            } else {
                return (
                    <NormalHeader edit={edit} setEdit={setEdit} newUser={newUser} setSort={setSort} title={"Profile"} setSearching={setSearching} />
                )
            }
        default:
            return (
                <NormalHeader setSort={setSort} setSearching={setSearching} title={"Home"} />
            )
    }
};