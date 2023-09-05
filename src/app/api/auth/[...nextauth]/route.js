import { connect } from "@/dbConfig/db";
import Users from "@/models/userModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "text", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connect();
          const user = await Users.findOne({ email });

          if (!user) {
            throw Error("email/password mismatch");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw Error("email/password mismatch");
          }
          return user;
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
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      try {
        if (session) {
          token = {
            ...token,
            pseudo: user?.pseudo,
            email: user?.email,
            watchlist: {
              animes: user?.watchlist.animes,
            },
          };
        }

        if (user?._id) {
          token = {
            ...token,
            id: user?._id,
            isAdmin: user?.isAdmin,
            pseudo: user?.pseudo,
            email: user?.email,
            watchlist: user?.watchlist,
          };
        }
        //update token
        await connect();
        const currentUser = await Users.findById(token.id);

        if (session?.pseudo && trigger === "update") {
          currentUser.pseudo = session.pseudo;
          token.pseudo = session.pseudo;
        }

        if (session?.email && trigger === "update") {
          currentUser.email = session.email;
          token.email = session.email;
        }

        if (session?.watchlist?.animes && trigger === "update") {
          currentUser.watchlist = session.watchlist;
          token.watchlist = session.watchlist;
        }

        await currentUser.save();

        return token;
      } catch (error) {
        console.error("Erreur dans jwt callback :", error.message);
      }
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token?.id,
          isAdmin: token.isAdmin,
          pseudo: token.pseudo,
          email: token.email,
          watchlist: token.watchlist,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
