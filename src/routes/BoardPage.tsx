/* eslint-disable react-hooks/exhaustive-deps */
import { CustomCreateModal } from '@/atom'
import { Container, MainContent } from '@/components'
import { ColumnsContainer } from '@/components/ColumnsContainer'
import { useTasks } from '@/hooks/useTasks'
import useModalStore from '@/store/ModalStore'
import useTaskStore from '@/store/TaskStore'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { IoIosAdd, IoIosArrowBack } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'

export const BoardPage = () => {
  const { userId } = useAuth()
  const { modals, toggleModal } = useModalStore()
  const { clearTaskStore } = useTaskStore()
  const { id } = useParams()
  const boardId = id!
  const { fetchUserTasks } = useTasks()
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate(`/${userId}`)
    clearTaskStore()
  }

  //TODO: Cuando se navega aqui, se hace el fetch de las tasks
  useEffect(() => {
    if (id) {
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
        <ColumnsContainer />
        <CustomCreateModal isOpen={modals.createTask} modalType="createTask">
          <CustomCreateModal.Task boardId={boardId} />
        </CustomCreateModal>
      </MainContent>
    </Container>
  )
}
