import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export default function verifyToken() {
  try {
    const token = getCookie("token");

    if (!token) {
      return false;
    }

    const tokenData = jwt.verify(token.value, process.env.JWT_SECRET_KEY);

    return { ...tokenData, value: token };
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return false;
  }
}
