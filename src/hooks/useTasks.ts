import { loadUserTasks } from '@/services/task'
// import { loadTasks } from '@/store/TaskStore'
import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'

export function useTasks() {
  const { getToken } = useAuth()
  const tasks = useQuery({
    queryKey: ['loadUserTasks'],
    queryFn: async () => {
      const token = await getToken()
      if (token) {
        const result = await loadUserTasks({ token })
        //TODO: loadTasks
        return result
      }
    }
  })
  if (tasks.isSuccess) {
    //TODO: dispatch de las tasks
  }
  //TODO:get all users tasks
  // const fetchTaskById = () => {}
  // const updateTask = () => {}
  // const deleteTask = () => {}

  return {
    tasks
  }
}
