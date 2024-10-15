import { Column, ColumnType, Task } from '@/types'
import { create } from 'zustand'

interface ColumnState {
  columns: Map<ColumnType, Column>
  loadColumns: (columns: Map<ColumnType, Column>) => void
  addTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  updateTask: (updatedTask: Task) => void
}

const columnsType: ColumnType[] = ['todo', 'done', 'inprogess']

const useColumnStore = create<ColumnState>(set => ({
  columns: new Map<ColumnType, Column>(),

  // Cargar tareas y organizarlas en columnas
  loadColumns: columns => {
    set({ columns })
  },

  // Añadir una nueva tarea
  addTask: newTask => {
    set(state => {
      const currentColumn = state.columns.get(newTask.status)
      if (currentColumn) {
        currentColumn.tasks.push(newTask)
        return { columns: new Map(state.columns) } // Crear una nueva referencia del Map
      }
      return state // Si no se encontró la columna, no se modifica el estado
    })
  },

  // Eliminar una tarea
  deleteTask: taskId => {
    set(state => {
      const updatedColumns = new Map(state.columns)
      updatedColumns.forEach(column => {
        column.tasks = column.tasks.filter(task => task.taskId !== taskId)
      })
      return { columns: updatedColumns }
    })
  },

  // Actualizar una tarea
  updateTask: updatedTask => {
    set(state => {
      const updatedColumns = new Map(state.columns)
      updatedColumns.forEach(column => {
        column.tasks = column.tasks.map(task =>
          task.taskId === updatedTask.taskId
            ? { ...task, ...updatedTask }
            : task
        )
      })
      return { columns: updatedColumns }
    })
  }
}))
export default useColumnStore
