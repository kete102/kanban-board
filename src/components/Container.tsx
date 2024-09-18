interface Props {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return (
    <div className="mx-auto flex h-screen w-screen flex-col items-center justify-center bg-black">
      {children}
    </div>
  )
}
