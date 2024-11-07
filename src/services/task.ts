import { API_URL } from '@/config'
import { StartCreateTaskProps } from '@/types'
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
    const tasks = data.tasks
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
    return data
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
