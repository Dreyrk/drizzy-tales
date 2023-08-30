export default async function getPromotedAnimes() {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_ANIME_API_URL}/anime?page[limit]=3&page[offset]=0&sort=-favoritesCount`,
      { cache: "no-store" }
    );

    if (res.ok) {
      res = await res.json();
      let data = res.data;
      data = data.map((anime) => {
        return {
          id: anime.id,
          img: {
            poster: anime.attributes.posterImage,
            cover: anime.attributes.coverImage,
          },
        };
      });
      return data;
    } else {
      throw new Error("Failed to fetch kitsu");
    }
  } catch (e) {
    console.error(`error: ${e.message}`);
  }
}
