"use server";

import { headers } from "next/headers";

async function updateWatchlist(id, data) {
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  try {
    if (id) {
      console.log(`${protocal}://${host}/api/users/${id}/watchlist`);
      let res = await fetch(`${protocal}://${host}/api/users/${id}/watchlist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(data),
      });

      res = await res.json();

      if (res.success) {
        return res.data;
      }
    }
  } catch (e) {
    console.error(`failed to update watchlist : ${e.message}`);
  }
}

export default updateWatchlist;
