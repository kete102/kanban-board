import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'

export const UserInfo = () => {
  const { user } = useUser()

  return (
    <SignedIn>
      <div className="flex items-center gap-2">
        {user && (
          <span className="text-md hidden font-bold text-white sm:inline md:text-lg lg:text-xl">
            {user.username}
          </span>
        )}
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-10 h-10'
            },
            variables: {
              fontSize: '1rem',
              colorText: 'white'
            }
          }}
        />
      </div>
    </SignedIn>
  )
}
