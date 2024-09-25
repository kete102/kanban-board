// import { mockBoard } from '@/mock/mockBoards'
// import { Board } from '@/types'
import { BASE_API_ENDPOINT } from '@/config'

// interface Props {
//   userId: string
// }
//
// const boards: Board[] = [mockBoard]

export async function FetchBoards({ token }) {
  try {
    const response = await fetch(`http://localhost:3000/api/boards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.ok) {
      const data = await response.json()
      return data.boards
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching the user boards')
  }
}

// export async function FetchBoardById({ userId, boardId }) {
//   console.log(userId, boardId)
//   try {
//     //TODO: Aqui va la logia de firebase
//   } catch (error) {
//     console.error(error)
//     console.error(error)
//     throw new Error(`Error fetching board`)
//   }
// }

export async function CreateNewBoard({
  boardTitle,
  boardDescription,
  token
}: {
  boardTitle: string
  boardDescription: string
  token: string
}) {
  try {
    const response = await fetch(`${BASE_API_ENDPOINT}/api/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ boardTitle, boardDescription })
    })

    if (response.ok) {
      const data = await response.json()

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
