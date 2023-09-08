function getLocalUrl() {
  if (process.env.NODE_ENV === "production") {
    return process.env.VERCEL_URL;
  } else {
    return "http://localhost:3000/";
  }
}

export default getLocalUrl;
