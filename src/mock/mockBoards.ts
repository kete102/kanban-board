import { Board } from '@/types'

export const mockBoard: Board = {
  userId: 'user_2mCwsSNkNCNcfhVtI15O9pfh57e',
  boardId: 'board-1',
  boardTitle: 'Mi Tablero Personalizado',
  boardDescription: 'Mi primer tablero',
  columns: [
    {
      columnId: '1',
      columnTitle: 'To do',
      tasks: [
        {
          taskId: 'task-1',
          columnId: '',
          taskDescription: 'Tarea 1',
          priority: 1
        },
        {
          taskId: 'task-2',
          columnId: '1',
          taskDescription: 'Tarea 2',
          priority: 2
        },

        {
          taskId: 'task-3',
          columnId: '1',
          taskDescription: 'Tarea 3',
          priority: 3
        }
      ]
    },

    {
      columnId: '2',
      columnTitle: 'To do',
      tasks: [
        {
          taskId: 'task-1',
          columnId: '2',
          taskDescription: 'Tarea 1',
          priority: 1
        },
        {
          taskId: 'task-2',
          columnId: '2',
          taskDescription: 'Tarea 2',
          priority: 2
        },

        {
          taskId: 'task-3',
          columnId: '2',
          taskDescription: 'Tarea 3',
          priority: 3
        }
      ]
    },

    {
      columnId: '3',
      columnTitle: 'To do',
      tasks: [
        {
          taskId: 'task-1',
          columnId: '3',
          taskDescription: 'Tarea 1',
          priority: 1
        },
        {
          taskId: 'task-2',
          columnId: '3',
          taskDescription: 'Tarea 2',
          priority: 2
        },

        {
          taskId: 'task-3',
          columnId: '3',
          taskDescription: 'Tarea 3',
          priority: 3
        }
      ]
    }
  ]
}
