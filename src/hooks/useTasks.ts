import {
  loadBoardTasks,
  startCreateTask,
  startDeleteTask,
  startUpdateTaskStatus
} from '@/services/task'
import useTaskStore from '@/store/TaskStore'
import { TaskColumnType } from '@/types'
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
    targetColumn: TaskColumnType
  }) => {
    const token = await getToken()
    try {
      if (token) {
        const result = await startUpdateTaskStatus({
          taskId,
          targetColumn,
          token
        })
        console.log(result)
        if (!result.ok && result.error) {
          toast.error(result.error)
        }

        if (result.updatedTaskId && result.message) {
          onStateChange(result.updatedTaskId, targetColumn)
          toast.success(result.message)
        }
      }
    } catch (error) {
      console.log('Error updating task status: ', error)
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
        const result = await startDeleteTask({ taskId, boardId, token })
        if (!result.ok) {
          console.error(result.error)
        }
        const deletedTaskId = result.deletedTaskId
        if (deletedTaskId) {
          onDeleteTask(deletedTaskId)
          toast.success('Task deleted')
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
