import { ColumnType, Task } from '@/types'

/**
 * Task response from API
 **/
interface RawTask {
  _id: string
  userId: string
  boardId: string
  taskTitle: string
  taskDescription: string
  status: ColumnType
  priority: 'high' | 'low' | 'medium'
  createdAt: string
  lastUpdate: number
  endDate: string
}
/**
 * Maps a rawTask to satisfy the Task interface
 * @param rawTask - Task from API
 * @returns Mapped task
 */
export function mapTask(rawTask: RawTask): Task {
  return {
    id: rawTask._id,
    userId: rawTask.userId,
    boardId: rawTask.boardId,
    taskTitle: rawTask.taskTitle,
    taskDescription: rawTask.taskDescription,
    status: rawTask.status,
    priority: rawTask.priority,
    createdAt: rawTask.createdAt,
    lastUpdate: rawTask.lastUpdate,
    endDate: rawTask.endDate
  }
}

/**
 * Maps the raw response of tasks from API
 * @param rawTasks - Tasks response from API
 * @returns Mapped tasks
 */
export function mapTasks(rawTasks: RawTask[]): Task[] {
  return rawTasks.map(mapTask)
}
