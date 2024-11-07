import { Column, ColumnType, Task } from '@/types'
import { create } from 'zustand'

interface TaskState {
  tasks: Task[]
  onLoadTasks: (tasks: Task[]) => void
  onAddTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onUpdateTask: (updatedTask: Task) => void
  getTasksByColumns: () => Map<ColumnType, Column>
}

const useTaskStore = create<TaskState>(set => ({
  tasks: [],

  onLoadTasks: tasks =>
    set(() => ({
      tasks: tasks
    })),

  onAddTask: task =>
    set(state => ({
      tasks: [...state.tasks, task]
    })),

  onDeleteTask: taskId =>
    set(state => ({
      tasks: state.tasks.filter(task => task._id !== taskId)
    })),

  onUpdateTask: updatedTask =>
    set(state => ({
      tasks: state.tasks.map(task =>
        task._id === updatedTask._id ? { ...task, ...updatedTask } : task
      )
    })),

  getTasksByColumns: () => {
    // Definir los tipos de columnas según tu interfaz
    const columnTypes: ColumnType[] = ['todo', 'inprogress', 'done']

    // Inicializar el Map con todas las columnas
    const columns = columnTypes.reduce((acc, columnType) => {
      acc.set(columnType, {
        columnId: columnType,
        tasks: []
      })
      return acc
    }, new Map<ColumnType, Column>())

    // Rellenar el Map con las tareas correspondientes
    useTaskStore.getState().tasks.forEach((task: Task) => {
      if (columns.has(task.status)) {
        columns.get(task.status)!.tasks.push(task)
      }
    })

    return columns
  }
}))

export default useTaskStore
