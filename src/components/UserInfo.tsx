import { SignedIn, UserButton } from '@clerk/clerk-react'

export const UserInfo = () => {
  return (
    <SignedIn>
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'w-12 h-12'
          },
          variables: {
            fontSize: 'text-lg',
            colorText: 'white'
          }
        }}
        showName={true}
      />
    </SignedIn>
  )
}