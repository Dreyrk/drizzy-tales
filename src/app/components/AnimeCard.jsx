import Image from "next/image";
import Link from "next/link";
import Loader from "./Loader";

export default function AnimeCard({ anime, isLoading, isError, id }) {
    const poster = anime?.posterImage?.medium;
    const type = anime?.subtype;

    if (type === "movie") {
        return (
            <Link className="max-h-full" href={`anime/${id}`}>
                <div className="max-h-full min-w-[182px] flex flex-col gap-2">
                    <Image height={554} width={390} loader={() => poster} unoptimized={true} className="object-cover rounded-lg" src={poster} alt={anime.canonicalTitle} />
                    <p className="m-0 text-sm font-semibold">{anime.titles.en || anime.titles.en_jp || anime.canonicalTitle}</p>
                    <p className="m-0 text-xs font-light">{anime.ageRatingGuide || "Unknown"}</p>
                </div>
            </Link>
        )
    } else if (type !== "movie") {
        return (
            <Link className="max-h-full" href={`anime/${id}`}>
                <div className="max-h-full min-w-[182px] flex flex-col gap-2">
                    <Image height={554} width={390} loader={() => poster} unoptimized={true} className="object-cover rounded-lg" src={poster} alt={anime.canonicalTitle} />
                    <p className="m-0 max-h-[35px] overflow-y-hidden no-scrollbar text-sm font-semibold">{anime.titles.en || anime.titles.en_jp || anime.canonicalTitle}</p>
                    <p className="m-0 text-xs font-light">{anime.episodeCount || anime.totalLength} episodes</p>
                </div>
            </Link>
        )
    } else if (!anime && isLoading) {
        return <Loader />
    } else if (!anime && isError) {
        return <p>{isError}</p>
    }
}