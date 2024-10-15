import { useTasks } from '@/hooks/useTasks'
import useBoardStore from '@/store/BoardStore'

export const BoardPage = () => {
  const { tasks } = useTasks()
  const { boards } = useBoardStore()
  console.log(boards)
  console.log(tasks.data)
  //TODO: Cuando se navega aqui, se hace el fetch de las tasks
  return (
    <div>
      <h1>Board Page</h1>
    </div>
  )
}
