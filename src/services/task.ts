import { API_URL } from '@/config'
import { ColumnType, StartCreateTaskProps } from '@/types'
import { mapTask, mapTasks } from '@/utils/mapRawTasks'
import axios from 'axios'

export const loadBoardTasks = async ({
  token,
  boardId
}: {
  token: string
  boardId: string
}) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/tasks/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const tasks = mapTasks(data.tasks)
    console.log(tasks)
    return tasks
  } catch (error) {
    console.log(error)
  }
}

export const startCreateTask = async ({
  token,
  newTaskData,
  boardId
}: StartCreateTaskProps) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/tasks/${boardId}`,
      newTaskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    console.log('New task created: ', { data })
    const newTask = mapTask(data.newTask)
    return newTask
  } catch (error) {
    console.log(error)
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
}): Promise<{ ok: boolean; res: string | null; error: string | null }> => {
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
        res: null,
        error: 'No ha sido posible eliminar la tarea'
      }
    }
    return {
      ok: true,
      res: data.deletedTaskId,
      error: null
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
      res: null,
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
  targetColumn: ColumnType
  token: string
}): Promise<{ ok: boolean; res: string | null; error: string | null }> => {
  console.log('startUpdateTaskStatus: ', {
    taskId,
    targetColumn,
    token
  })

  try {
    const { data } = await axios.patch(
      `${API_URL}/api/tasks/update-status`,
      {
        taskId,
        newStatus: targetColumn
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(data)
    if (!data) {
      return {
        ok: false,
        res: null,
        error: 'No ha sido posible actualizar la tarea'
      }
    }
    console.log(data)
    return {
      ok: true,
      res: data.updatedTask,
      error: null
    }
  } catch (error) {
    let errorMessage = 'Error al actualizar la tarea'

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data?.message || errorMessage
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    return {
      ok: false,
      res: null,
      error: errorMessage
    }
  }
}
