import { connect } from "@/dbConfig/db";
import Users from "@/models/userModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import getLocalUrl from "@/utils/getLocalUrl";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { id: "email", type: "text", label: "Email" },
        password: { id: "password", type: "password", label: "Password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          if (!credentials) {
            return;
          } else {
            await connect();
            const user = await Users.findOne({ email });

            if (!user) {
              return null;
            }

            const passwordsMatch = await bcrypt.compare(
              password,
              user.password
            );

            if (!passwordsMatch) {
              return null;
            }
            return user;
          }
        } catch (error) {
          console.error("Error in authorize: ", error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/profile",
  },
  database: process.env.MONGO_URI,
  site: getLocalUrl(),
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.pseudo) {
        token.user.pseudo = session.pseudo;
      }
      if (trigger === "update" && session?.email) {
        token.user.email = session?.email;
      }
      if (trigger === "update" && session?.watchlist) {
        token.user.watchlist.animes = session?.watchlist.animes;
      }

      //update user in db
      if (trigger === "update") {
        await connect();
        const currentUser = await Users.findById(token.id);

        currentUser.pseudo = token.user.pseudo;
        currentUser.email = token.user.email;
        currentUser.watchlist.animes = token.user.watchlist.animes;

        await currentUser.save();

        return token;
      }
      //pass user infos in token
      if (user._id) {
        token.user = {
          id: user._id,
          isAdmin: user.isAdmin,
          pseudo: user.pseudo,
          email: user.email,
          watchlist: user.watchlist,
        };
        console.log(token);
        return token;
      }
    },
    async session({ session, token, user }) {
      console.log(user);
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
