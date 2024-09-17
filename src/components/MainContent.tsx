interface Props {
  children: React.ReactNode
}

export const MainContent = ({ children }: Props) => {
  return (
    <div className="mx-auto flex h-screen w-screen flex-col items-center justify-center bg-neutral-900">
      {children}
    </div>
  )
}
