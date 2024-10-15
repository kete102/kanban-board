/* eslint-disable react-hooks/exhaustive-deps */
import { useTasks } from '@/hooks/useTasks'
import useColumnStore from '@/store/ColumnStore'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const BoardPage = () => {
  const { columns } = useColumnStore()
  const { id } = useParams()
  const { fetchUserTasks } = useTasks()

  //TODO: Cuando se navega aqui, se hace el fetch de las tasks
  useEffect(() => {
    if (id) fetchUserTasks({ boardId: id })
  }, [])

  console.log(columns)

  return (
    <div>
      <h1>Board Page</h1>
    </div>
  )
}
