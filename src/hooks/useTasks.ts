import { loadBoardTasks, startCreateTask } from '@/services/task'
import useColumnStore from '@/store/ColumnStore'
import { Column, ColumnType, Task } from '@/types'
import { useAuth } from '@clerk/clerk-react'

function getTasksByColumns({ tasks }) {
  // Definir los tipos de columnas según tu interfaz
  const columnTypes: ColumnType[] = ['todo', 'inprogess', 'done']

  // Inicializar el Map con todas las columnas
  const columns = columnTypes.reduce((acc, columnType) => {
    acc.set(columnType, {
      columnId: columnType,
      tasks: []
    })
    return acc
  }, new Map<ColumnType, Column>())

  // Rellenar el Map con las tareas correspondientes
  tasks.forEach((task: Task) => {
    if (columns.has(task.status)) {
      columns.get(task.status)!.tasks.push(task)
    }
  })
  // Convertir el Map a un objeto plano para que sea compatible con JSON
  // const objectColumns = Object.fromEntries(columns)

  //Devolver las columnas como respuesta JSON
  return columns
}

export function useTasks() {
  const { loadColumns, addTask } = useColumnStore()
  const { getToken } = useAuth()

  const fetchUserTasks = async ({ boardId }: { boardId: string }) => {
    const token = await getToken()
    try {
      if (token && boardId) {
        const tasks = await loadBoardTasks({
          boardId,
          token
        })

        const mappedColumns = getTasksByColumns({ tasks })
        //TODO: Mapear las tasks en cada columan y devolver las columnas
        console.log(mappedColumns)
        loadColumns(mappedColumns)
      }
    } catch (error) {
      console.log({ error })
    }
  }
  //TODO:
  const createNewTask = async ({
    taskTitle,
    taskDescription,
    priority,
    status,
    boardId,
    endDate
  }) => {
    const token = await getToken()
    const newTask = {
      taskTitle,
      taskDescription,
      status,
      priority,
      endDate,
      createdAt: new Date().toISOString().split('T')[0]
    }

    try {
      if (token) {
        const result = await startCreateTask({
          token,
          newTaskData: newTask,
          boardId
        })
        console.log('New task: ', result)
        addTask(result)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // const fetchTaskById = () => {}
  // const updateTask = () => {}
  // const deleteTask = () => {}

  return {
    fetchUserTasks,
    createNewTask
  }
}
