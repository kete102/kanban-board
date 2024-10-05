import { useUser } from '@clerk/clerk-react'
import { PiKanbanBold } from 'react-icons/pi'
import { UserInfo } from './UserInfo'

interface Props {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  const { user } = useUser()

  if (!user) {
    return (
      <div className="mx-auto flex min-h-screen w-screen flex-col items-center justify-start gap-10 bg-[#e3e3e3] py-20">
        <section>
          <h1 className="rounded-md bg-zinc-950 px-6 py-3 text-5xl font-bold text-[#e3e3e3] md:text-7xl">
            Welcome!
          </h1>
        </section>
        {children}
      </div>
    )
  }
  return (
    <div
      className="mx-auto flex min-h-screen w-screen flex-col items-center bg-[#e3e3e3]"
      id="container"
    >
      <section className="sticky left-0 top-0 mb-2 flex w-full items-center justify-between bg-zinc-950 p-3 md:mb-6 md:w-[calc(100%-100px)] md:rounded-b-lg md:p-6 lg:w-[calc(100%-150px)]">
        <h1 className="inline-flex items-center gap-3 text-xl font-bold text-white md:text-3xl">
          Kanban App <PiKanbanBold size={`${25}`} />
        </h1>
        <UserInfo />
      </section>
      {children}
    </div>
  )
}
