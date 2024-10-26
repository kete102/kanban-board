export type ColumnType = 'todo' | 'inprogess' | 'done'

export interface Task {
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
