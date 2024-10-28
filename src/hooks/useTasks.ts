import { loadBoardTasks, startCreateTask } from '@/services/task'
import useTaskStore from '@/store/TaskStore'
import { useAuth } from '@clerk/clerk-react'

export function useTasks() {
  const { loadTasks, addTask } = useTaskStore()
  const { getToken } = useAuth()

  const fetchUserTasks = async ({ boardId }: { boardId: string }) => {
    const token = await getToken()
    try {
      if (token && boardId) {
        const tasks = await loadBoardTasks({
          boardId,
          token
        })

        //TODO: Mapear las tasks en cada columan y devolver las columnas
        loadTasks(tasks)
      }
    } catch (error) {
      console.log({ error })
    }
  }
  //TODO:
  const createNewTask = async ({
    taskTitle,
    taskDescription,
    priority,
    status,
    boardId,
    endDate
  }) => {
    const token = await getToken()
    const newTask = {
      taskTitle,
      taskDescription,
      status,
      priority,
      endDate,
      createdAt: new Date().toISOString().split('T')[0]
    }

    try {
      if (token) {
        const result = await startCreateTask({
          token,
          newTaskData: newTask,
          boardId
        })
        const task = result.newTask
        addTask(task)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // const fetchTaskById = () => {}
  // const updateTask = () => {}
  // const deleteTask = () => {}

  return {
    fetchUserTasks,
    createNewTask
  }
}
