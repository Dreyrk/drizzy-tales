"use server";

import { connect } from "@/src/dbConfig/db";
import User from "@/src/models/userModel";
import verifyToken from "@/src/utils/verifyToken.js";

export default async function updateUser(newData, type) {
  const token = verifyToken();
  if (!token.id) {
    throw new Error("Please Sign In to get a token");
  } else {
    try {
      connect();
      const userToUpdate = await User.findById(token.id);
      if (type === "watchlist") {
        userToUpdate.watchlist = newData;
        await userToUpdate.save();
      } else if (type === "infos") {
        userToUpdate.watchlist = newData;
        await userToUpdate.save();
      } else {
        userToUpdate.watchlist.anime = [];
        throw new Error("no type of update provided");
      }
    } catch (e) {
      throw new Error(`Failed to use db: ${e.message}`);
    }
  }
}
