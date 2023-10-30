'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Registry from './registry';
import Retrieve from './retrieve';
import Login from './login';

export default function Main() {
  const { data: session, status } = useSession();
  console.log(status);
  return (
    <main className="align-top lg:flex sm:block">
      {session ? (
        <>
          <Registry />
          <Retrieve />
        </>
      ) : (
        <Login />
      )}
    </main>
  );
}
