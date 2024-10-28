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
