import { API_URL } from '@/config'
import { Column, ColumnType } from '@/types'
import axios from 'axios'

export const loadBoardTasks = async ({
  token,
  boardId
}: {
  token: string
  boardId: string
}) => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.data) {
      const { objectColumns } = await response.data
      if (objectColumns) {
        const columnsMap = new Map<ColumnType, Column>(
          Object.entries(objectColumns) as [ColumnType, Column][]
        )
        return columnsMap
      }
    } else {
      throw new Error('Error al cargar las tasks')
    }
  } catch (error) {
    console.log(error)
  }
}

interface StartCreateTaskProps {
  token: string
  newTaskData: {
    taskTitle: string
    taskDescription: string
    status: string
    priority: string
    createdAt: string
  }
  boardId: string
}
export const startCreateTask = async ({
  token,
  newTaskData,
  boardId
}: StartCreateTaskProps) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/tasks/${boardId}`,
      newTaskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}
