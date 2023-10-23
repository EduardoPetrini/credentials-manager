import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions as NextAuthConfig } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module 'next-auth/jwt' {
  interface JWT {
    /** The user's role. */
    userRole?: 'admin';
  }
}

const { BASE_URL = 'http://localhost:3000' } = process.env;

export const config = {
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  providers: [
    CredentialsProvider({
      id: 'user-cred',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          });
          console.log('login results');
          const user = await res.json();
          console.log(user);

          if (res.ok && user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      console.log('jwt', token);
      // token.userRole = 'admin';
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // console.log('sign in callback', user);
      return true;
    },
    async redirect({ url, baseUrl }) {
      // console.log('redirect in callback', baseUrl);
      return baseUrl;
    },
    async session({ session, user, token }) {
      // console.log('session in callback', session);
      return session;
    },
  },
} satisfies NextAuthConfig;

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, config);
}

// We recommend doing your own environment variable validation
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NEXTAUTH_SECRET: string;
    }
  }
}
