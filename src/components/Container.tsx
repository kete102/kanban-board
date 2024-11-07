import { PiKanbanBold } from 'react-icons/pi'
import { VscGithub } from 'react-icons/vsc'
import { UserInfo } from './UserInfo'

interface Props {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return (
    <div
      className="mx-auto flex min-h-dvh w-screen flex-col items-center bg-[#e3e3e3]"
      id="container"
    >
      <section className="sticky left-0 top-0 mb-2 flex w-full items-center justify-between bg-zinc-950 p-3 md:mb-6 md:w-[calc(100%-100px)] md:rounded-b-lg md:p-6 lg:w-[calc(100%-150px)]">
        <h1 className="inline-flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
          Kanban App <PiKanbanBold size={`${25}`} />
        </h1>
        <UserInfo />
      </section>
      {children}
      <footer className="w-full bg-zinc-950 p-4 text-center text-white">
        <a href="https://github.com/kete102">
          Made with 🧡 by{' '}
          <strong className="inline-flex items-center gap-1 underline">
            Flavius Catalin <VscGithub size={20} />
          </strong>
        </a>
      </footer>
    </div>
  )
}
