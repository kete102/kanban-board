import { Board } from '@/types'
import { BiSearch } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface Props {
  board: Board
  onDelete: ({ id }: { id: string }) => void
}

export const BoardItem = ({ board, onDelete }: Props) => {
  const navigate = useNavigate()
  const handleBoardNavigation = () => {
    navigate(`/boards/${board.boardId}`)
    console.log('Nav to board:', board.boardId)
  }

  return (
    <div className="flex max-w-sm flex-col items-start justify-between rounded-md bg-zinc-950 px-10 py-5 shadow-lg shadow-zinc-950/40">
      <section className="w-fit">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {board.boardTitle}
        </h5>
        <p className="text-md mb-5 text-wrap font-normal text-gray-500">
          {board.boardDescription}
        </p>
      </section>
      <section className="flex gap-4">
        <button
          className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
          onClick={handleBoardNavigation}
        >
          <BiSearch size={18} />
          View
        </button>
        <button
          className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          onClick={() => onDelete({ id: board.boardId })}
        >
          <MdDeleteForever size={20} />
          Delete
        </button>
      </section>
    </div>
  )
}
