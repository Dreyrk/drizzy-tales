import useSWR from "swr";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_ANIME_API_URL;

async function fetcher(url) {
  const res = await fetch(`${BASE_URL}/${url}`, {
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}

function useFetch(url) {
  const { data, error } = useSWR(url, fetcher);

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFetch;
