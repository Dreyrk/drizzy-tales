import Link from "next/link";

import Loader from "./Loader";
import Image from "next/image";

export default function AnimeCard({ anime, isLoading, isError, id }) {
    const poster = anime?.posterImage?.medium;
    const mediumImgWidth = anime?.posterImage?.meta.dimensions.medium?.width;
    const mediumImgHeight = anime?.posterImage?.meta.dimensions.medium?.height;
    const type = anime?.subtype;

    if (type === "movie") {
        return (
            <Link className="max-h-full" href={`anime/${id}`}>
                <div className="max-h-full min-w-[182px] flex flex-col gap-2">
                    {/*TO DO: Lorsque la src de l'image n'est pas ou plus dispo, afficher missing*/}
                    <Image height={mediumImgHeight || 554} width={mediumImgWidth || 390} loader={() => poster} unoptimized={true} className="object-cover rounded-lg" src={poster} alt={anime.canonicalTitle} />
                    <p className="m-0 text-sm font-semibold">{anime.titles.en || anime.titles.en_jp || anime.canonicalTitle}</p>
                    <p className="m-0 text-xs font-light">{anime.ageRatingGuide || "Unknown"}</p>
                </div>
            </Link>
        )
    } else if (type !== "movie") {
        return (
            <Link className="max-h-full" href={`anime/${id}`}>
                <div className="max-h-full min-w-[182px] flex flex-col gap-2">
                    <Image height={mediumImgHeight || 554} width={mediumImgWidth || 390} loader={() => poster} unoptimized={true} className="object-cover rounded-lg" src={poster} alt={anime.canonicalTitle} />
                    <p className="m-0 max-h-[35px] overflow-y-auto no-scrollbar text-sm font-semibold">{anime.titles.en || anime.titles.en_jp || anime.canonicalTitle}</p>
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