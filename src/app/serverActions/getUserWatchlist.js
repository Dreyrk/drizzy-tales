"use server";
import getLocalUrl from "@/utils/getLocalUrl";

const BASE_URL = getLocalUrl();

async function getUserWatchlist(id) {
  try {
    if (id) {
      const res = await fetch(`${BASE_URL}/api/users/${id}/watchlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
