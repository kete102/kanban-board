/* eslint-disable react-hooks/exhaustive-deps */
import { MainContent } from '@/components'
import { KanbanColumn } from '@/components/KanbanColumn'
import { NewTaskModal } from '@/components/NewTaskModal'
import { useTasks } from '@/hooks/useTasks'
import useModalStore from '@/store/ModalStore'
import useTaskStore from '@/store/TaskStore'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

export const BoardPage = () => {
  const [selectedColumn, setSelectedColumn] = useState<string>('')
  const { modals, toggleModal } = useModalStore()
  const { getTasksByColumns, tasks } = useTaskStore()
  const { id } = useParams()
  const { fetchUserTasks, createNewTask } = useTasks()
  const columns = useMemo(() => getTasksByColumns(), [tasks])

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

  console.log(columns)
  return (
    <MainContent
      style={modals.createTask ? 'blur-sm bg-white/95 pointer-events-none' : ''}
    >
      <div className="mx-auto flex h-full w-full min-w-fit max-w-xs flex-col items-start justify-center gap-4 sm:max-w-md md:max-w-2xl lg:max-w-4xl lg:flex-row xl:max-w-6xl">
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
