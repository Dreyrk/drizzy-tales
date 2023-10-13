"use server";

import { headers } from "next/headers";
import postMessage from "@/app/serverActions/postMessage";

async function updateWatchlist(user, data) {
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  try {
    if (user.id) {
      let res = await fetch(
        `${protocal}://${host}/api/users/${user.id}/watchlist`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify(data),
        }
      );

      res = await res.json();

      if (res.success) {
        const message = {
          user,
          text: data.attributes.titles.en,
          auto: res.message,
        };
        postMessage(message);
      }
      return res.data;
    }
  } catch (e) {
    console.error(`failed to update watchlist : ${e.message}`);
  }
}

export default updateWatchlist;
