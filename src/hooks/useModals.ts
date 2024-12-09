import useModalStore from '@/store/ModalStore'
import { BoardInputs, TaskInputs } from '@/types/modals/modals.types'
import { DEFAULT_START_DATE } from '@/utils/dates'
import { useBoards } from './useBoards'
import { useTasks } from './useTasks'

interface HandleSubmitTaskProps {
  taskData: TaskInputs
  boardId: string
}

export function useModals() {
  const { toggleModal } = useModalStore()
  const { addNewBoard } = useBoards()
  const { addNewTask } = useTasks()

  const handleSubmitBoard = (boardData: BoardInputs) => {
    addNewBoard(boardData)
    toggleModal('createBoard')
  }

  const handleSubmitTask = ({ taskData, boardId }: HandleSubmitTaskProps) => {
    const newTask = { ...taskData, boardId }
    addNewTask(newTask)
    toggleModal('createTask')
  }

  return {
    handleSubmitBoard,
    handleSubmitTask
  }
}
