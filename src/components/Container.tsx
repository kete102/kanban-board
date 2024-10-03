import { PiKanbanBold } from 'react-icons/pi'
import { UserInfo } from './UserInfo'

interface Props {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return (
    <div
      className="mx-auto flex min-h-screen w-screen flex-col items-center bg-[#e3e3e3]"
      id="container"
    >
      <section className="sticky left-0 top-0 mb-2 flex w-full items-center justify-between bg-zinc-950 p-3 text-right md:mb-6 md:w-[calc(100%-100px)] md:rounded-b-lg md:p-6 lg:w-[calc(100%-150px)]">
        <h1 className="inline-flex items-center gap-3 text-xl font-bold text-white md:text-3xl">
          Kanban App <PiKanbanBold size={`${25}`} />
        </h1>
        <UserInfo />
      </section>
      {children}
    </div>
  )
}
