export type ColumnType = 'todo' | 'inprogess' | 'done'

export interface Task {
  taskId: string
  userId: string
  taskTitle: string
  taskDescription: string
  status: ColumnType
  priority: 'high' | 'low' | 'medium'
  endDate: string
  createdAt: string
}

export interface Column {
  columnId: ColumnType
  tasks: Task[]
}

export interface Board {
  boardId: string
  boardTitle: string
  boardDescription: string
  columns: Map<ColumnType, Column>
}

interface User {
  userId: string
  userName: string
  avatarImage: string
}
