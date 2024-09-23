export interface Task {
  taskId: string
  taskDescription: string
  columnId: string
  priority: number
}

export interface Column {
  columnId: string
  columnTitle: 'To do' | 'In Progress' | 'Done'
  tasks: Task[]
}

export interface Board {
  boardId: string
  boardTitle: string
  boardDesc: string
}

interface User {
  userId: string
  userName: string
  boards: Board[]
}
