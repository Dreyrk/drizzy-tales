'use client'

import { useParams } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import YouTube from "react-youtube"
import { IoArrowBack } from "react-icons/io5"
import Link from "next/link"


import useFetch from "@/app/hooks/useFetch"
import Loader from "@/app/components/Loader"
import NavBar from "@/app/components/NavBar"
import DetailsBox from "@/app/components/DetailsBox"

export default function AnimeDetails() {
  const params = useParams();
  const { data, isLoading, isError } = useFetch(`anime/${params.id}`);
  const poster = data?.attributes.posterImage?.large;
  const cover = data?.attributes.coverImage?.large;
  const genresLink = data?.relationships.genres.links.related;
  const [genres, setGenres] = useState([]);

  const [play, setPlay] = useState(false);

  const YouTubeOpts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    },
  };

  const getGenres = useCallback(async () => {
    const res = await fetch(`${genresLink}`)
    if (res.ok) {
      const genresData = await res.json()
      setGenres(genresData.data)
    } else {
      throw new Error("Failed to fetch genres")
    }
  }, [genresLink])

  useEffect(() => {
    if (data && !isLoading && !isError) {
      getGenres()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const dynamicBackgroundImg = `
    @media (max-width: 767px) {
      .custom-background {
        background-image: url(${poster});
      }
    }

    @media (min-width: 768px) {
      .custom-background {
        background-image: url(${cover});
      }
    }
  `

  if (data && !isError && !isLoading) {
    return (
      <div className="page">
        <Link href={"/"} className="absolute top-0 left-0">
          <IoArrowBack size={50} color="#f4f4f6" />
        </Link>
        <style>
          {dynamicBackgroundImg}
        </style>
        <div className="h-[50vh] bg-cover w-screen -z-10 cover-img custom-background">
        </div>
        {
          !play ?
            <DetailsBox anime={data} genres={genres} setPlay={setPlay} />
            :
            <div className="w-screen h-screen -translate-y-1/3">
              <YouTube videoId={data?.attributes.youtubeVideoId} onError={() => setPlay(false)} opts={YouTubeOpts} onEnd={() => setPlay(false)} />
            </div>
        }
        <NavBar />
      </div>
    )
  } else if (!data && isLoading) {
    return (
      <div className="grid w-screen h-screen place-content-center">
        <Loader />
      </div>
    )
  } else if (!data && isError) {
    return <p>{isError}</p>
  }
}