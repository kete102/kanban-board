import { Board } from '@/types'
import { MdDeleteForever } from 'react-icons/md'

interface Props {
  board: Board
  onDelete: ({ boardId }: { boardId: string }) => void
}

export const BoardItem = ({ board, onDelete }: Props) => {
  return (
    <div className="max-w-sm cursor-pointer rounded-md bg-zinc-900 p-6">
      <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {board.boardTitle}
      </h5>
      <p className="mb-5 text-xl font-normal text-gray-700 dark:text-gray-400">
        {board.boardDescription}
      </p>
      <button
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-xl font-semibold text-white shadow-sm"
        onClick={() => onDelete({ boardId: board.boardId })}
      >
        <MdDeleteForever size={30} />
        Delete
      </button>
    </div>
  )
}
