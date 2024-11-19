import { Column, ColumnType, Task } from '@/types'
import { create } from 'zustand'

interface TaskState {
  tasks: Task[] | null
  onLoadTasks: (tasks: Task[] | null) => void
  onAddTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onStateChange: (taskId: string, newStatus: ColumnType) => void
  getTasksByColumns: () => Map<ColumnType, Column>
  findTaskById: (taskId: string) => Task | undefined
  clearTaskStore: () => void
}

const useTaskStore = create<TaskState>(set => ({
  tasks: null,

  onLoadTasks: tasks =>
    set(() => ({
      tasks: tasks
    })),

  onAddTask: task =>
    set(state => ({
      tasks: state.tasks ? [...state.tasks, task] : [task]
    })),

  onDeleteTask: taskId =>
    set(state => ({
      tasks: state.tasks ? state.tasks.filter(task => task.id !== taskId) : null
    })),

  onStateChange: (taskId: string, newStatus: ColumnType) =>
    set(state => ({
      tasks: state.tasks
        ? state.tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        : null
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
    const currentTasks = useTaskStore.getState().tasks
    if (currentTasks) {
      currentTasks.forEach((task: Task) => {
        if (columns.has(task.status)) {
          columns.get(task.status)!.tasks.push(task)
        }
      })
    }
    return columns
  },

  findTaskById: (taskId: string) => {
    return useTaskStore
      .getState()
      .tasks?.find((task: Task) => task.id === taskId)
  },
  clearTaskStore: () => {
    set({
      tasks: null
    })
  }
}))

export default useTaskStore
