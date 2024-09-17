import { SignedIn, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export const MainContent = ({ children }: Props) => {
  return (
    <section className="mt-10 flex h-[80dvh] w-full max-w-7xl flex-col items-center justify-center rounded-md bg-white">
      <SignedIn>
        <UserButton />
        <SignOutButton />
      </SignedIn>
      {children}
    </section>
  )
}
