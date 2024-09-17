import { SignedIn, UserButton } from '@clerk/clerk-react'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export const MainContent = ({ children }: Props) => {
  return (
    <section className="h-[80dvh] w-full max-w-screen-2xl rounded-md bg-white">
      <div className="flex h-full w-full flex-col rounded-md">
        <section className="mx-4 my-5 p-4 text-right">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-12 h-12'
                },
                variables: {
                  fontSize: 'text-lg'
                }
              }}
              showName={true}
            />
          </SignedIn>
        </section>
        {children}
      </div>
    </section>
  )
}
