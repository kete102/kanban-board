import { Board } from '@/types'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { MdDeleteForever } from 'react-icons/md'

interface Props {
  board: Board
  onDelete: ({ id }: { id: string }) => void
}

export const BoardItem = ({ board, onDelete }: Props) => {
  const handleBoardNavigation = () => {
    console.log('Nav to board:', board.boardId)
  }

  return (
    <div className="flex min-h-fit max-w-64 flex-col items-start justify-between rounded-md bg-zinc-900 p-6">
      <section>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {board.boardTitle}
        </h5>
        <p className="text-md mb-5 text-wrap font-normal text-gray-500">
          {board.boardDescription}
        </p>
      </section>
      <section className="flex gap-2">
        <button
          className="inline-flex cursor-pointer items-center gap-x-1 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-black shadow-sm"
          onClick={() => onDelete({ id: board.boardId })}
        >
          <MdDeleteForever size={20} />
          Delete
        </button>
        <button
          className="inline-flex cursor-pointer items-center gap-x-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-black shadow-sm"
          onClick={handleBoardNavigation}
        >
          View
          <IoIosArrowRoundForward size={20} />
        </button>
      </section>
    </div>
  )
}
