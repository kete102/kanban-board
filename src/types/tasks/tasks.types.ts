export type TaskColumnType = 'todo' | 'inprogress' | 'done'

export const columnNames: Record<TaskColumnType, string> = {
  todo: 'To Do',
  inprogress: 'In progress',
  done: 'Done'
}
export type TaskPriority = 'high' | 'low' | 'medium'

export interface Column {
  columnId: TaskColumnType
  tasks: Task[]
}

export interface Task {
  taskId: string
  userId: string
  boardId: string
  taskTitle: string
  taskDescription: string
  taskStatus: TaskColumnType
  taskPriority: TaskPriority
  createdAt: string
  lastUpdate: number
  taskEndDate: string
}

export interface StartCreateTaskProps {
  token: string
  newTask: {
    taskTitle: string
    taskDescription: string
    taskStatus: string
    taskPriority: string
    createdAt: string
    boardId: string
  }
}
