import { mockBoard } from '@/mock/mockBoards'
import { Board } from '@/types'

interface Props {
  userId: string
}

const boards: Board[] = [mockBoard]

export async function FetchBoards({ userId }: Props) {
  try {
    //TODO: Aqui va la llamda a mongo
    console.log(userId)
    return boards
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching the user boards')
  }
}

export async function FetchBoardById({ userId, boardId }) {
  console.log(userId, boardId)
  try {
    //TODO: Aqui va la logia de firebase
  } catch (error) {
    console.error(error)
    console.error(error)
    throw new Error(`Error fetching board`)
  }
}

export async function CreateNewBoard({
  boardTitle,
  boardDescription,
  token
}: {
  boardTitle: string
  boardDescription: string
  token: string
}) {
  console.log('Crear tablero nuevo:', boardDescription, boardTitle)
  try {
    const response = await fetch('http://localhost:3000/api/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ boardTitle, boardDescription })
    })

    if (response.ok) {
      const data = await response.json()

      console.log(`Board created with ID: ${data.boardId}`)
      return {
        boardId: data.boardId
      }
    } else {
      const errorData = await response.json()
      console.error('Error creating new Board', errorData)
    }
  } catch (error) {
    console.error(error)
  }
}
