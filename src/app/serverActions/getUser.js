"use server";

import { connect } from "@/src/dbConfig/db";
import User from "@/src/models/userModel";
import verifyToken from "@/src/utils/verifyToken.js";

export default async function getUser() {
  const token = verifyToken();
  if (!token.id) {
    return null;
  } else {
    try {
      connect();
      const user = await User.findById(token.id);
      return {
        pseudo: user.pseudo,
        email: user.email,
        isAdmin: user.isAdmin,
        watchlist: {
          animes: user.watchlist.animes,
          mangas: user.watchlist.mangas,
        },
      };
    } catch (e) {
      throw new Error(`failed to get user in db: ${e.message}`);
    }
  }
}
