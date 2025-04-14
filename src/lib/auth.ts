
import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const authOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub,
        name: token.name,
        email: token.email,
        image: token.picture,
      }
      return session
    },
  },
  events: {
    async signIn({ user, account, email, credentials }) {
      console.log('Signed In', user, account, email, credentials);
    },
    async signOut({ token }) {
      console.log('Sign Out', token);
    }
  },
  pages: {
    signIn: '/login',  // Specify your custom sign-in page
    //signOut: '/auth/signout',
    //error: '/auth/error', // Error code passed in query string as ?error=
    //verifyRequest: '/auth/verify-request', // (used for check email message)
    //newUser: null // If set, new users will be directed here on first sign in
  }
}

export default NextAuth(authOptions)


    