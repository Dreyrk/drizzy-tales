import { connect } from "@/dbConfig/db";
import Users from "@/models/userModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connect();
          const user = await Users.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error in authorize: ", error);
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
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.pseudo) {
        token.pseudo = session.pseudo;
      }
      if (trigger === "update" && session?.email) {
        token.email = session.email;
      }
      if (trigger === "update" && session?.watchlist) {
        token.watchlist.animes = session?.watchlist.animes;
      }
      //pass user infos in token
      if (user) {
        return {
          ...token,
          id: user._id,
          isAdmin: user.isAdmin,
          pseudo: user.pseudo,
          email: user.email,
          watchlist: user.watchlist,
        };
      }
      //update user in db
      await connect();
      const currentUser = await Users.findById(token.id);

      currentUser.pseudo = token.pseudo;
      currentUser.email = token.email;
      currentUser.watchlist.animes = token.watchlist.animes;

      await currentUser.save();

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          pseudo: token.pseudo,
          email: token.email,
          watchlist: token.watchlist,
          id: token.id,
          isAdmin: token.isAdmin,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
