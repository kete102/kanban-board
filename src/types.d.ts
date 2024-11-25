export type ColumnType = 'todo' | 'inprogress' | 'done'

export interface Task {
  id: string
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

export interface Column {
  columnId: ColumnType
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
  userName: string
  avatarImage: string
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
