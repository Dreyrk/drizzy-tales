import { getServerSession } from "next-auth";
import AuthProvider from "./AuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Drizzy Tales",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#000814] text-white relative max-h-screen`}>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
