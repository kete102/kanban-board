import { Board } from '@/types/boards/board.types'
import { useAuth } from '@clerk/clerk-react'
import { BiSearch } from 'react-icons/bi'
import { CiCalendar } from 'react-icons/ci'
import { MdDeleteForever } from 'react-icons/md'
import { Link } from 'react-router-dom'

interface Props {
  board: Board
  onDelete: ({ id }: { id: string }) => void
}

export const BoardItem = ({ board, onDelete }: Props) => {
  const { userId } = useAuth()

  return (
    <div className="flex w-full min-w-fit flex-col items-start justify-between rounded-md border border-gray-400 bg-zinc-300/50 px-10 py-5 shadow-xl">
      <section className="w-full max-w-md">
        <h5 className="text-950 mb-2 w-full text-xl font-bold tracking-tight">
          {board.boardTitle}
        </h5>
        <p className="text-md mb-5 w-full text-wrap font-normal text-gray-500">
          {board.boardDescription}
        </p>
      </section>
      <div>
        <h5 className="inline-flex items-center gap-1 font-semibold text-zinc-500">
          <CiCalendar size={24} />
          {board.createdAt}
        </h5>
      </div>
      <section className="flex gap-4">
        <Link
          to={`/${userId}/boards/${board.boardId}`}
          className="inline-flex items-center"
        >
          <button className="inline-flex items-center rounded-md border-2 border-indigo-600 bg-indigo-300 px-5 py-2.5 text-sm font-bold text-zinc-600">
            <BiSearch size={18} />
            View
          </button>
        </Link>
        <button
          className="inline-flex items-center rounded-md border-2 border-red-700 bg-red-300 px-5 py-2.5 text-sm font-bold text-zinc-600"
          onClick={() => onDelete({ id: board.boardId })}
        >
          <MdDeleteForever size={20} />
          Delete
        </button>
      </section>
    </div>
  )
}
