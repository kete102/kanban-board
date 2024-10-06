import { Task } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TasksInitialState {
  tasks: Task[]
}

const initialState: TasksInitialState = {
  tasks: []
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = [...action.payload]
    },
    createTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.tasks.map(task => {
        if (task.taskId === action.payload.taskId) {
          task = action.payload
        }
      })
    },
    removeBoard: (state, action: PayloadAction<{ taskId: string }>) => {
      state.tasks.filter(task => task.taskId !== action.payload.taskId)
    }
  }
})

export const { removeBoard, createTask, updateTask, setTasks } =
  taskSlice.actions
export default taskSlice.reducer
