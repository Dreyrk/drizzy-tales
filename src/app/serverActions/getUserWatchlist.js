"use server";

import { headers } from "next/headers";

async function getUserWatchlist(id) {
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";

  try {
    if (id) {
      const res = await fetch(
        `${protocal}://${host}/api/users/${id}/watchlist`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        return data.data;
      }
    }
  } catch (e) {
    console.error(`failed to get watchlist : ${e.message}`);
  }
}

export default getUserWatchlist;
