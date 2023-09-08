"use server";
import getLocalUrl from "@/utils/getLocalUrl";

const BASE_URL = getLocalUrl();

async function updateWatchlist(id, data) {
  let res = await fetch(`api/users/${id}/watchlist`, {
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

export default updateWatchlist;
