'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Registry from './registry';
import Retrieve from './retrieve';
import Login from './login';

export default function Main() {
  const { data: session, status } = useSession();
  console.log(status);
  return (
    <main className="flex min-h-screen flex-col items-center lg:w-1/2">
      {session ? (
        <>
          <Registry />
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <Retrieve />
        </>
      ) : (
        <Login />
      )}
    </main>
  );
}
