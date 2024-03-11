import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { Session } from 'next-auth';
import { User, Account, Profile } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import axios from 'axios';

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
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }: { user: User | AdapterUser; account: Account | null; profile?: Profile; email?: { verificationRequest?: boolean }; credentials?: Record<string, any> }) {
            // Attempt to save the user using the /api/saveUser route, but do not affect the sign-in process
            // Fire and forget the request, not waiting for the response
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/save-user`, {
                name: user.name,
                email: user.email,
                image: user.image,
                provider: account?.provider
            }).catch(error => {
                console.error('Error attempting to save user:', error);
            });
      
            // Always return true to continue with the sign-in
            return true;
        },
        async session({ session, token }: { session: Session; token: any }) {
            // Send properties to the client, like an access_token from a provider
            (session as ExtendedSession).accessToken = token.accessToken;

            return session;
        }
    }
});