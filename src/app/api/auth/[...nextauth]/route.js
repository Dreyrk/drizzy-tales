import { connect } from "@/dbConfig/db";
import Users from "@/models/userModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
      if (trigger === "update" && session?.pseudo) {
        token.user.pseudo = session.pseudo;
      }
      if (trigger === "update" && session?.email) {
        token.user.email = session.email;
      }
      if (user) {
        token = {
          ...token,
          user: {
            id: user?._id,
            isAdmin: user?.isAdmin,
            pseudo: user?.pseudo,
            email: user?.email,
          },
        };
        await Users.findByIdAndUpdate(token.user.id, {
          pseudo: token.pseudo,
          email: token.email,
        });
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
