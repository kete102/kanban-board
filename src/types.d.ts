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
  userId: string
  boardId: string
  boardTitle: string
  boardDescription: string
  columns: Column[]
}
