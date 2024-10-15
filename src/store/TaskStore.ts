import { Task } from '@/types'
import { create } from 'zustand'

interface TaskState {
  tasks: Task[]
  loadTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  updateTask: (updatedTask: Task) => void
}

const useTaskStore = create<TaskState>(set => ({
  tasks: [],
  loadTasks: tasks => {
    set({ tasks })
  },
  addTask: newTask => {
    set(state => ({
      tasks: [...state.tasks, newTask]
    }))
  },
  deleteTask: taskId => {
    set(state => ({
      tasks: state.tasks.filter(task => task.taskId !== taskId)
    }))
  },
  updateTask: updatedTask => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.taskId === updatedTask.taskId ? { ...task, ...updatedTask } : task
      )
    }))
  }
}))

export default useTaskStore
