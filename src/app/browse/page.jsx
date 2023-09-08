import Browse from "../components/Browse";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserWatchlist from "../serverActions/getUserWatchlist";

export default async function Page() {
    const session = await getServerSession(authOptions)

    const watchlist = await getUserWatchlist(session?.user.id)
    return (
        <>
            <Browse watchlist={watchlist} />
        </>
    )
};