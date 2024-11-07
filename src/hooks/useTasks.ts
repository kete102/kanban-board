import {
  loadBoardTasks,
  startCreateTask,
  startDeleteTask
} from '@/services/task'
import useTaskStore from '@/store/TaskStore'
import { useAuth } from '@clerk/clerk-react'

export function useTasks() {
  const { onLoadTasks, onAddTask, onDeleteTask } = useTaskStore()
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
        onLoadTasks(tasks)
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
        onAddTask(task)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async ({
    taskId,
    boardId
  }: {
    taskId: string
    boardId: string
  }) => {
    const token = await getToken()

    try {
      if (token) {
        //1. Primero eliminar de la DB
        const result = await startDeleteTask({ taskId, boardId, token })
        if (!result.ok) {
          console.error(result.error)
        }
        const deletedTaskId = result.res
        if (deletedTaskId) {
          //2. Eliminar del estado
          onDeleteTask(deletedTaskId)
          console.log('Tarea eliminada')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    fetchUserTasks,
    createNewTask,
    deleteTask
  }
}
