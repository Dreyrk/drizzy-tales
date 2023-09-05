function getLocalUrl() {
  if (process.env.VERCEL_ENV === "production") {
    return process.env.VERCEL_URL;
  } else {
    return "http://localhost:3000/";
  }
}

export default getLocalUrl;
