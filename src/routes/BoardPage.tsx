import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const BoardPage = () => {
  const { boardId } = useParams()
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const fetchBoard = async () => {
      const response = await fetch(`/api/boards/${boardId}`)
      const data = await response.json()
      setBoard(data) // Guardar los detalles de la board en el estado
    }

    fetchBoard()
  }, [boardId])

  if (!board) return <div>Loading...</div>

  console.log(board)

  return (
    <div>
      <h1>Board Page</h1>
    </div>
  )
}
