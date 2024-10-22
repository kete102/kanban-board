import { loadBoardTasks, startCreateTask } from '@/services/task'
import useColumnStore from '@/store/ColumnStore'
import { Column, ColumnType } from '@/types'
import { useAuth } from '@clerk/clerk-react'

export function useTasks() {
  const { loadColumns } = useColumnStore()
  const { getToken } = useAuth()

  const fetchUserTasks = async ({ boardId }: { boardId: string }) => {
    const token = await getToken()
    try {
      if (token && boardId) {
        const result = await loadBoardTasks({
          boardId,
          token
        })
        if (result) {
          const mappedColumns: Map<ColumnType, Column> = result
          loadColumns(mappedColumns)
        }
        console.log(result)
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
        console.log(result)
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
