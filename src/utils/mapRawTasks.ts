import { ColumnType, Task } from '@/types'

interface RawTask {
  _id: string
  userId: string
  boardId: string
  taskTitle: string
  taskDescription: string
  status: ColumnType
  priority: 'high' | 'low' | 'medium'
  createdAt: string
  endDate: string
}
/**
 * Mapea una tarea cruda (RawTask) al formato esperado de la interfaz Task.
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
    endDate: rawTask.endDate
  }
}

/**
 * Mapea un arreglo de tareas crudas (RawTask) al formato esperado.
 */
export function mapTasks(rawTasks: RawTask[]): Task[] {
  return rawTasks.map(mapTask)
}
