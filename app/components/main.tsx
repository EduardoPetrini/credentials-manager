'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Registry from './registry';
import Retrieve from './retrieve';

export default function Main() {
  const { data: session, status } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center w-1/2">
      {session ? (
        <>
          <Registry />
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <Retrieve />
        </>
      ) : (
        <>
          <span>You are not signed in</span>
          <a
            href={`/api/auth/signin`}
            onClick={e => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign in
          </a>
        </>
      )}
    </main>
  );
}
