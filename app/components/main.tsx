'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Registry from './registry';
import Retrieve from './retrieve';
import Login from './login';
import Loading from './ui/loading';
import { useEffect, useState } from 'react';

export default function Main() {
  const [load, setLoad] = useState(true);
  const { data: session, status } = useSession();
  console.log(status);

  useEffect(() => {
    if (status !== 'loading') {
      setLoad(false);
    } else {
      setLoad(true);
    }
  }, [status]);
  return (
    <main className="align-top lg:flex sm:block">
      {session ? (
        <>
          <Registry setLoad={setLoad}/>
          <Retrieve setLoad={setLoad}/>
          {load ? <Loading /> : null}
        </>
      ) : (
        <Login />
      )}
    </main>
  );
}
