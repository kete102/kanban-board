/* eslint-disable react-hooks/exhaustive-deps */
import { MainContent } from '@/components'
import { NewTaskModal } from '@/components/NewTaskModal'
import { useTasks } from '@/hooks/useTasks'
import useColumnStore from '@/store/ColumnStore'
import useModalStore from '@/store/ModalStore'
import { Task } from '@/types'
import { useEffect } from 'react'
import { FcPlus } from 'react-icons/fc'
import { useParams } from 'react-router-dom'

export const BoardPage = () => {
  const { modals, toggleModal } = useModalStore()
  const { columns } = useColumnStore()
  const { id } = useParams()
  const { fetchUserTasks } = useTasks()

  //TODO: Cuando se navega aqui, se hace el fetch de las tasks
  useEffect(() => {
    if (id) fetchUserTasks({ boardId: id })
  }, [])

  const handleAddTask = () => {
    console.log('Add Task')
    toggleModal('createTask')
  }

  const handleSubmit = () => {
    console.log('submit')
  }

  return (
    <MainContent
      style={modals.createTask ? 'blur-sm bg-white/95 pointer-events-none' : ''}
    >
      <div className="mx-auto flex h-full w-full min-w-fit max-w-xs flex-col items-center justify-center gap-4 sm:max-w-md md:max-w-2xl lg:max-w-4xl lg:flex-row xl:max-w-6xl">
        {Array.from(columns.entries()).map(([id, column]) => (
          <div
            key={id}
            id={id}
            className="my-2 flex min-h-20 w-full flex-col items-center rounded-md border-zinc-100 bg-zinc-200/90 p-2 shadow-xl shadow-white md:max-w-xl lg:max-w-2xl"
          >
            <h4 className="inline-flex h-20 w-full items-center justify-between p-2 pt-2 text-center align-middle text-xl font-bold uppercase text-zinc-600/80">
              {column.columnId}
              <FcPlus
                size={25}
                className="cursor-pointer hover:scale-125"
                onClick={handleAddTask}
              />
            </h4>
            {column.tasks.map((task: Task) => (
              <div className="">
                <h3 className="text-black">wow increible</h3>
              </div>
            ))}
          </div>
        ))}
      </div>
      <NewTaskModal handleSubmit={handleSubmit} />
    </MainContent>
  )
}
