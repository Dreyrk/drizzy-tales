import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import AnimeDetails from "@/app/components/AnimeDetails";
import getUserWatchlist from "@/app/serverActions/getUserWatchlist";


export default async function Page() {
    const session = await getServerSession(authOptions);

    const watchlist = await getUserWatchlist(session?.user.id);

    return (
        <>
            <AnimeDetails watchlist={watchlist} />
        </>
    )
}