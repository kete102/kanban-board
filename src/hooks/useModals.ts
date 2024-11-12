import useModalStore from '@/store/ModalStore'
import { DEFAULT_START_DATE } from '@/utils/dates'
import { useState } from 'react'
import { DateValueType } from 'react-tailwindcss-datepicker'
import { useBoards } from './useBoards'
import { useTasks } from './useTasks'

interface HandleSubmitTaskProps {
  event: React.FormEvent<HTMLFormElement>
  boardId: string
}

const dateInitialState = {
  startDate: DEFAULT_START_DATE,
  endDate: null
}

export function useModals() {
  const { toggleModal } = useModalStore()
  const { addNewBoard } = useBoards()
  const { createNewTask } = useTasks()
  const [priority, setPriority] = useState<string>('')
  const [date, setDate] = useState<DateValueType>(dateInitialState)

  const handleSubmitBoard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const boardData = {
      boardTitle: formData.get('boardTitle') as string,
      boardDescription: formData.get('boardDescription') as string
    }
    addNewBoard(boardData)
    toggleModal('createBoard')
  }

  const handleSubmitTask = ({ event, boardId }: HandleSubmitTaskProps) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const taskData = {
      taskTitle: formData.get('taskTitle') as string,
      taskDescription: formData.get('taskDescription') as string,
      priority: formData.get('priority') as string,
      status: 'todo',
      endDate: formData.get('taskEndDate') as string,
      boardId
    }
    console.log(taskData)
    createNewTask(taskData)
    toggleModal('createTask')
    setPriority('')
    setDate(dateInitialState)
  }

  const handleDateChange = (event: DateValueType) => {
    if (event?.endDate) {
      setDate(event)
    }
  }

  const handlePriorityChange = (priorityLevel: string) => {
    setPriority(priorityLevel)
  }

  return {
    handleSubmitBoard,
    handleSubmitTask,
    handleDateChange,
    handlePriorityChange,
    priority,
    date
  }
}
