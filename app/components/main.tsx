'use client'

import Registry from './registry'
import Retrieve from './retrieve'

export default function Main() {
  return (
    <main className="flex min-h-screen flex-col items-center w-1/2">
      <Registry />
      <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700'/>
      <Retrieve />
    </main>
  )
}
