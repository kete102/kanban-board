import { Column, Task, TaskColumnType } from '@/types/tasks/tasks.types'
import { create } from 'zustand'

interface TaskState {
  tasks: Task[] | null
  onLoadTasks: (tasks: Task[] | null) => void
  onAddTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onStateChange: (taskId: string, newStatus: TaskColumnType) => void
  getTasksByColumns: () => Map<TaskColumnType, Column>
  onUpdateTasks: (tasks: Task[]) => void
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
      tasks: state.tasks
        ? state.tasks.filter(task => task.taskId !== taskId)
        : null
    })),

  onStateChange: (sourceColumn: string, targetColumn: TaskColumnType) =>
    set(state => ({
      tasks: state.tasks
        ? state.tasks.map(task =>
            task.taskId === sourceColumn
              ? { ...task, taskStatus: targetColumn }
              : task
          )
        : null
    })),

  getTasksByColumns: () => {
    // Definir los tipos de columnas según tu interfaz
    const columnTypes: TaskColumnType[] = ['todo', 'inprogress', 'done']

    // Inicializar el Map con todas las columnas
    const columns = columnTypes.reduce((acc, columnType) => {
      acc.set(columnType, {
        columnId: columnType,
        tasks: []
      })
      return acc
    }, new Map<TaskColumnType, Column>())

    // Rellenar el Map con las tareas correspondientes
    const currentTasks = useTaskStore.getState().tasks
    if (currentTasks) {
      currentTasks.forEach((task: Task) => {
        if (columns.has(task.taskStatus)) {
          columns.get(task.taskStatus)!.tasks.push(task)
        }
      })
    }
    return columns
  },

  findTaskById: (taskId: string) => {
    return useTaskStore
      .getState()
      .tasks?.find((task: Task) => task.taskId === taskId)
  },

  onUpdateTasks: (tasks: Task[]) => {
    set({
      tasks: tasks
    })
  },

  clearTaskStore: () => {
    set({
      tasks: null
    })
  }
}))

export default useTaskStore
