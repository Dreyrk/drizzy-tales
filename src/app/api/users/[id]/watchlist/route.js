import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import Users from "@/models/userModel";

export async function PUT(req, { params, query }) {
  const { id } = params;
  const anime = await req.json();
  try {
    await connect();
    const currentUser = await Users.findById(id);

    if (query && query.type === "manga") {
      return NextResponse.json(
        { message: "mangas watchlist is not available yet" },
        { status: 400 }
      );
    }

    const animeIsInWatchlist = currentUser.watchlist.animes.some(
      (el) => el.id === anime.id
    );

    if (!animeIsInWatchlist) {
      currentUser.watchlist.animes.push(anime);
    } else {
      currentUser.watchlist.animes = currentUser.watchlist.animes.filter(
        (el) => el.id !== anime.id
      );
    }

    await currentUser.save();
    return NextResponse.json(
      { success: true, data: currentUser.watchlist },
      { status: 201 }
    );
  } catch (e) {
    console.error(`Failed to update watchlist: ${e.message}`);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function GET(req, { params, query }) {
  const { id } = params;
  try {
    if (query && query.type === "manga") {
      return NextResponse.json(
        { message: "mangas watchlist is not available yet" },
        { status: 400 }
      );
    } else {
      await connect();
      const currentUser = await Users.findById(id);

      return NextResponse.json(
        { data: currentUser.watchlist },
        { status: 200 }
      );
    }
  } catch (e) {
    console.error(`Failed to get watchlist: ${e.message}`);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
