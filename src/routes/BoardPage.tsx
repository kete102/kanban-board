/* eslint-disable react-hooks/exhaustive-deps */
import { CustomCreateModal } from '@/atom'
import { Container, KanbanColumn, MainContent } from '@/components'
import { useTasks } from '@/hooks/useTasks'
import useModalStore from '@/store/ModalStore'
import useTaskStore from '@/store/TaskStore'
import { useAuth } from '@clerk/clerk-react'
import { useEffect, useMemo } from 'react'
import { IoIosAdd, IoIosArrowBack } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'

export const BoardPage = () => {
  const { userId } = useAuth()
  const { modals, toggleModal } = useModalStore()
  const { getTasksByColumns, tasks } = useTaskStore()
  const { id } = useParams()
  const boardId = id!
  const { fetchUserTasks } = useTasks()
  const columns = useMemo(() => getTasksByColumns(), [tasks])
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate(`/${userId}`)
  }

  //TODO: Cuando se navega aqui, se hace el fetch de las tasks
  useEffect(() => {
    if (id && tasks.length === 0) {
      fetchUserTasks({ boardId: id })
    }
  }, [])

  return (
    <Container>
      <MainContent>
        <section className="mx-auto mt-8 flex w-full max-w-lg flex-row items-center justify-between px-3 md:max-w-2xl lg:max-w-4xl xl:max-w-[1250px]">
          <button
            onClick={handleNavigation}
            className="rounded-full border border-zinc-400/50 bg-zinc-300 p-2"
          >
            <IoIosArrowBack size={25} fill="#858483" />
          </button>

          <button
            className="inline-flex items-center gap-2 rounded-md border-2 border-violet-800 bg-violet-600 px-3 py-1.5 text-lg font-semibold text-white shadow-inner shadow-white/10"
            onClick={() => toggleModal('createTask')}
          >
            Add task
            <IoIosAdd
              size={28}
              className="transition-transform duration-300 ease-in-out hover:rotate-90"
            />
          </button>
        </section>
        <div className="mx-auto mt-2 flex h-full max-h-fit w-full min-w-fit max-w-xs flex-col items-center justify-start gap-4 p-4 sm:max-w-md md:max-w-lg lg:max-w-4xl lg:flex-row lg:items-start xl:max-w-6xl">
          {Array.from(columns).map(([columnType, column]) => (
            <KanbanColumn
              key={column.columnId}
              column={column}
              columnType={columnType}
            />
          ))}
        </div>
        <CustomCreateModal isOpen={modals.createTask} modalType="createTask">
          <CustomCreateModal.Task boardId={boardId} />
        </CustomCreateModal>
      </MainContent>
    </Container>
  )
}
