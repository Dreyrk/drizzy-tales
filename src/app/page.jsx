import Carousel from "./components/Carousel";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Section from "./components/Section";
import getPromotedAnimes from "./serverActions/getPromotedAnimes.js"

const categories = [
  {
    name: "Trending",
    url: "trending/anime",
  },
  {
    name: "Most Liked",
    url: "anime?page[limit]=20&page[offset]=0&sort=popularityRank,ratingRank&includes=[posterImage]"
  },
  {
    name: "Best Movie",
    url: "anime?page[limit]=20&page[offset]=0&sort=popularityRank&filter[subtype]=movie&includes=[posterImage]"
  },
  {
    name: "Original Classics",
    url: "anime?page[limit]=20&page[offset]=0&filter[status]=finished&sort=createdAt&includes=[posterImage]"
  },
  {
    name: "Soon",
    url: "anime?page[limit]=20&page[offset]=0&sort=-startDate&includes=[posterImage]",
    last: true
  },
]


export default async function Home() {

  const promotedAnimes = await getPromotedAnimes()

  return (
    <div className="page">
      <NavBar />
      <Header />
      <div className="gap-4 content no-scrollbar">
        <Carousel slides={promotedAnimes} />
        {categories.map((cat) => {
          return <Section key={cat.name} category={cat} />
        })}
      </div>
    </div>
  );
}
