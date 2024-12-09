import { Task, TaskColumnType, TaskPriority } from '@/types/tasks/tasks.types'

/**
 * Task response from API
 **/
interface TaskAPIResponse {
  _id: string
  userId: string
  boardId: string
  taskTitle: string
  taskDescription: string
  taskStatus: string
  taskPriority: string
  createdAt: string
  lastUpdate: number
  taskEndDate: string
}

/**
 * Maps the raw response of tasks from API
 * @param apiResponse - Tasks response from API
 * @returns Mapped tasks if apiReponse is a Task array, else returns null.
 */
export function tasksAdapter(apiResponse: TaskAPIResponse[]): Task[] | null {
  if (Array.isArray(apiResponse) && apiResponse.length) {
    return apiResponse.map(task => ({
      taskId: task._id,
      userId: task.userId,
      boardId: task.boardId,
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      taskStatus: task.taskStatus as TaskColumnType,
      taskPriority: task.taskPriority as TaskPriority,
      createdAt: task.createdAt,
      lastUpdate: task.lastUpdate,
      taskEndDate: task.taskEndDate
    }))
  }
  return null
}
