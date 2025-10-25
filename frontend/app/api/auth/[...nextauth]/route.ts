import NextAuth, { Account, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import type { Profile, Session } from "next-auth"
import { AdapterUser } from "next-auth/adapters"

import { cookies } from "next/headers"


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),

    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", placeholder: "enter your name" },
        email: { label: "Email", type: "email", placeholder: "enter your email" },
      },
      async authorize(credentials) {
        console.log("Inside authorise fn")
        const res = await fetch("http://localhost:5000/api/v1/user/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        })

        const user = await res.json()
        
        if (res.ok && user) {
          console.log("inside authorize in if check ")
          console.log("User is ", user)
          return user
        }
        return null
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: User | AdapterUser
      account: Account | null
      profile?: Profile
      email?: { verificationRequest?: boolean }
      credentials?: Record<string, unknown>
    } ) {
      console.log("indside sign in")
      if (account?.provider === "credentials") {
        console.log("INSIDE CREDENTIALS PROVIDER")
      }
      if (account?.provider === "google") {
        // Save Google user in your DB
        const res =  await fetch("http://localhost:5000/api/v1/user/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.name,
            password : "logeg in by google",
          }), 
          credentials: "include",
        })
        const response = await res.json()

        user.id = response.data?.id || response.id;
        user.image = response.data?.image || response.image;
        const setCookie = res.headers.get("set-cookie")
        if (setCookie) {
          const token = setCookie.split(";")[0].split("=")[1];
          (await cookies()).set("token", token, { httpOnly: true, path: "/" })
        }
      }
      return true
    },
    async jwt({ token, user }) {
      // Runs on sign-in
      if (user?.id) token.id = user.id;
      if (user?.name) token.name = user.name;
      if (user?.email) token.email = user.email;
      if (user?.image) token.image = user.image;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      return session;
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
