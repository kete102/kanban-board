import { useParams } from 'react-router-dom'

export const BoardPage = () => {
  const { id } = useParams()
  console.log(id)
  //TODO: Cuando se navega aqui, se hace el fetch de las tasks
  return (
    <div>
      <h1>Board Page</h1>
    </div>
  )
}
