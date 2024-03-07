import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { Session } from 'next-auth';

interface ExtendedSession extends Session {
  accessToken?: string;
}

export default NextAuth({
  providers: [
      GithubProvider({
          clientId: process.env.GITHUB_ID || '',
          clientSecret: process.env.GITHUB_SECRET || ''
      })
  ],
  // Since you're not using a database, let's use JWT for session management
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      // Send properties to the client, like an access_token from a provider
      (session as ExtendedSession).accessToken = token.accessToken;
      return session;
    }
  }
});