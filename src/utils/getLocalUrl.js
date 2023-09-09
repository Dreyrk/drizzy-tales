function getLocalUrl() {
  const host =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : "localhost";
  const protocal = process.env.NODE_ENV === "production" ? "https" : "http";

  return { host, protocal };
}

export default getLocalUrl;
