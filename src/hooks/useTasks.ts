import { loadBoardTasks } from '@/services/task'
import useColumnStore from '@/store/ColumnStore'
import { useAuth } from '@clerk/clerk-react'

export function useTasks() {
  const { loadColumns } = useColumnStore()
  const { getToken } = useAuth()

  const fetchUserTasks = async ({ boardId }: { boardId: string }) => {
    const token = await getToken()
    try {
      if (token && boardId) {
        const result = await loadBoardTasks({ boardId, token })
        loadColumns(result)
        console.log(result)
      }
    } catch (error) {
      console.log({ error })
    }
  }
  //TODO:
  // const fetchTaskById = () => {}
  // const updateTask = () => {}
  // const deleteTask = () => {}

  return {
    fetchUserTasks
  }
}
