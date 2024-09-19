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
            fontSize: '1.3rem',
            colorText: 'white'
          }
        }}
        showName={true}
      />
    </SignedIn>
  )
}
