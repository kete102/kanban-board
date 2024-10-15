import { API_URL } from '@/config'
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

      const columnsMap = new Map(Object.entries(objectColumns))
      return columnsMap
    } else {
      throw new Error('Error al cargar las tasks')
    }
  } catch (error) {
    console.log(error)
  }
}
