import {
  loadBoardTasks,
  startCreateTask,
  startDeleteTask,
  startUpdateTaskStatus
} from '@/services/task'
import useTaskStore from '@/store/TaskStore'
import { ColumnType } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

export function useTasks() {
  const { onLoadTasks, onAddTask, onDeleteTask, onStateChange } = useTaskStore()
  const { getToken } = useAuth()

  const fetchUserTasks = async ({ boardId }: { boardId: string }) => {
    const token = await getToken()
    try {
      if (token && boardId) {
        const tasks = await loadBoardTasks({
          boardId,
          token
        })

        if (tasks) {
          onLoadTasks(tasks)
        }
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
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdate: Date.now()
    }
    console.log(newTask)

    try {
      if (token) {
        const task = await startCreateTask({
          token,
          newTaskData: newTask,
          boardId
        })
        if (task) {
          onAddTask(task)
          toast.success('New task created')
        }
      }
    } catch (error) {
      toast.error('Error creating task')
      console.log(error)
    }
  }

  const updateStatus = async ({
    taskId,
    targetColumn
  }: {
    taskId: string
    targetColumn: ColumnType
  }) => {
    const token = await getToken()
    try {
      if (token) {
        //1. Primero actualizar en la DB
        const result = await startUpdateTaskStatus({
          taskId,
          targetColumn,
          token
        })
        if (!result.ok) {
          console.error(result.error)
        }
        const updatedTaskId = result.res
        if (updatedTaskId) {
          //2. Actualizar la task en el estado
          onStateChange(taskId, targetColumn)
          toast.success('Task updated')
        }
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
    console.log({ boardId, taskId })
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
          toast.error('Task deleted')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    fetchUserTasks,
    createNewTask,
    updateStatus,
    deleteTask
  }
}
