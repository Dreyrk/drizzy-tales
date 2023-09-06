"use server";

async function getUserWatchlist(id) {
  try {
    const res = await fetch(`/api/users/${id}/watchlist`);

    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (e) {
    console.error(`failed to get watchlist : ${e.message}`);
  }
}
