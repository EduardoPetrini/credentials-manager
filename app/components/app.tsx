'use client';
import { SessionProvider } from "next-auth/react"

import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import Main from './main';

export default function App() {
  return (
    <SessionProvider>
      <Main />
    </SessionProvider>
  )
}
