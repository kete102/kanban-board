import { API_URL } from '@/config'
import {
  StartCreateTaskProps,
  Task,
  TaskColumnType,
  TaskPriority
} from '@/types/tasks/tasks.types'
import { tasksAdapter } from '@/utils/tasksAdapter'
import axios from 'axios'

export const loadBoardTasks = async ({
  token,
  boardId
}: {
  token: string
  boardId: string
}) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks/${boardId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.ok) {
      const data = await response.json()
      const tasks = tasksAdapter(data.tasks)
      return tasks
    }
  } catch (error) {
    console.log(error)
  }
}

export const startCreateTask = async ({
  token,
  newTask
}: StartCreateTaskProps): Promise<Task> => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/tasks/${newTask.boardId}`,
      newTask,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const { tasks: task } = await data

    return {
      taskId: task._id,
      userId: task.userId,
      boardId: task.boardId,
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      taskStatus: task.status as TaskColumnType,
      taskPriority: task.priority as TaskPriority,
      createdAt: task.createdAt,
      lastUpdate: task.lastUpdate,
      taskEndDate: task.endDate
    }
  } catch (error) {
    console.log(error)
    throw new Error(`Error creating new Task: ${error}`)
  }
}

export const startDeleteTask = async ({
  taskId,
  boardId,
  token
}: {
  taskId: string
  boardId: string
  token: string
}): Promise<{
  ok: boolean
  message?: string
  error?: string
  deletedTaskId?: string | null
}> => {
  try {
    const { data } = await axios.delete(`${API_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        taskId,
        boardId
      }
    })
    if (!data) {
      return {
        ok: false,
        deletedTaskId: null,
        error: 'No ha sido posible eliminar la tarea'
      }
    }
    return {
      ok: true,
      message: 'Task deleted',
      deletedTaskId: data.deletedTaskId
    }
  } catch (error) {
    let errorMessage = 'Error al eliminar la tarea'

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || errorMessage
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    return {
      ok: false,
      error: errorMessage
    }
  }
}

export const startUpdateTaskStatus = async ({
  taskId,
  targetColumn,
  token
}: {
  taskId: string
  targetColumn: TaskColumnType
  token: string
}) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskId,
        newStatus: targetColumn
      })
    })

    if (!response.ok) {
      return {
        success: false,
        error: 'Error updating task'
      }
    }

    const { task } = await response.json()

    return {
      success: true,
      message: 'Task updated',
      updatedTaskId: task._id
    }
  } catch (error) {
    console.log(error)
    let errorMessage = 'Error al actualizar la tarea'

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || errorMessage
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    return {
      ok: false,
      error: errorMessage
    }
  }
}
