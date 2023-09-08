import getUserWatchlist from "@/app/serverActions/getUserWatchlist";
import NavBar from "../../components/NavBar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Watchlist from "@/app/components/Watchlist";


export default async function Page() {
    const session = await getServerSession(authOptions)

    const watchlist = await getUserWatchlist(session?.user.id)

    return (
        <div className="page">
            <Watchlist watchlist={watchlist} />
            <NavBar />
        </div>
    );
}
