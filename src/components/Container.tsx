interface Props {
  children: React.ReactNode
}

const Container = ({ children }: Props) => {
  return (
    <div className="mx-auto flex h-screen w-screen flex-col items-center justify-center bg-neutral-900">
      {children}
    </div>
  )
}

export default Container
