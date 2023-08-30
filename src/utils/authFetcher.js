export default async function authFetcher(url, user) {
  const res = await fetch(`/api/${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });

  const response = await res.json();

  return {
    success: response.success,
    status: response.status,
    message: response.message,
    error: response.error,
  };
}
