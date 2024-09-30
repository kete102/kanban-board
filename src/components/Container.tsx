import { UserInfo } from './UserInfo'

interface Props {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return (
    <div
      className="mx-auto flex h-screen w-screen flex-col items-center bg-zinc-900"
      id="container"
    >
      <section className="mb-6 flex w-full items-center justify-between bg-zinc-950 p-6 text-right">
        <h1 className="text-3xl font-bold text-white">Kanban Board</h1>
        <UserInfo />
      </section>
      {children}
    </div>
  )
}
