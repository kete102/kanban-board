export type TaskColumnType = 'todo' | 'inprogress' | 'done'
export type TaskPriorityType = 'high' | 'low' | 'medium'

export interface Task {
  taskId: string
  userId: string
  boardId: string
  taskTitle: string
  taskDescription: string
  taskStatus: TaskColumnType
  taskPriority: TaskPriorityType
  createdAt: string
  lastUpdate: number
  endDate: string
}

export interface Column {
  columnId: TaskColumnType
  tasks: Task[]
}

export interface Board {
  boardId: string
  boardTitle: string
  boardDescription: string
  createdAt: string
}

interface User {
  userId: string
  clerkId: string
}

export interface StartCreateTaskProps {
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
