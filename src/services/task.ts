import { API_URL } from '@/config'
import axios from 'axios'

export const loadUserTasks = async ({ token }: { token: string }) => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.data) {
      return response.data
    } else {
      throw new Error('Error al cargar las tasks')
    }
  } catch (error) {
    console.log(error)
  }
}
