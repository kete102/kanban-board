/* eslint-disable react-hooks/exhaustive-deps */
import { MainContent } from '@/components'
import { KanbanColumn } from '@/components/KanbanColumn'
import { NewTaskModal } from '@/components/NewTaskModal'
import { useTasks } from '@/hooks/useTasks'
import useModalStore from '@/store/ModalStore'
import useTaskStore from '@/store/TaskStore'
import { useEffect, useMemo, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'

export const BoardPage = () => {
  const [selectedColumn, setSelectedColumn] = useState<string>('')
  const { modals, toggleModal } = useModalStore()
  const { getTasksByColumns, tasks } = useTaskStore()
  const { id } = useParams()
  const { fetchUserTasks, createNewTask } = useTasks()
  const columns = useMemo(() => getTasksByColumns(), [tasks])
  const navigate = useNavigate()
  interface SubmitProps {
    event: React.FormEvent<HTMLFormElement>
  }

  const handleSubmit = ({ event }: SubmitProps) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const taskData = {
      taskTitle: formData.get('taskTitle') as string,
      taskDescription: formData.get('taskDescription') as string,
      priority: formData.get('priority') as string,
      status: selectedColumn,
      endDate: formData.get('taskEndDate') as string,
      boardId: id
    }
    createNewTask(taskData)
    toggleModal('createTask')
    setSelectedColumn('')
  }

  //TODO: Cuando se navega aqui, se hace el fetch de las tasks
  useEffect(() => {
    if (id) fetchUserTasks({ boardId: id })
  }, [])

  return (
    <MainContent
      style={modals.createTask ? 'blur-sm bg-white/95 pointer-events-none' : ''}
    >
      <section className="mx-auto mt-3 flex w-full max-w-lg flex-row items-center justify-between px-3 md:max-w-2xl lg:max-w-4xl xl:max-w-[1250px]">
        <button onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={35} />
        </button>
        <h1 className="text-md font-bold">Nombre de la board</h1>
      </section>
      <div className="mx-auto mt-2 flex h-full w-full min-w-fit max-w-xs flex-col items-center justify-start gap-4 sm:max-w-md md:max-w-2xl lg:max-w-3xl lg:flex-row lg:items-start xl:max-w-6xl">
        {Array.from(columns).map(([columnType, column]) => (
          <KanbanColumn
            key={column.columnId}
            column={column}
            columnType={columnType}
            setSelectedColumn={setSelectedColumn}
          />
        ))}
      </div>
      <NewTaskModal handleSubmit={event => handleSubmit({ event })} />
    </MainContent>
  )
}
