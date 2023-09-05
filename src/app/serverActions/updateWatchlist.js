"use server";

import { connect } from "@/dbConfig/db";
import Users from "@/models/userModel";

async function updateWatchlist(id, data) {
  await connect();
  const currentUser = await Users.findById(id);
  currentUser.watchlist.animes = data;
  await currentUser.save();
}

export default updateWatchlist;
