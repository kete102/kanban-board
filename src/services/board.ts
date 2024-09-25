// import { Board } from '@/types'
import { BASE_API_ENDPOINT } from '@/config'

export function BoardActions() {
  const fetchBoards = async ({ token }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/boards`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        //TODO: Devolver los boards como Board[]
        return data.boards
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching the user boards')
    }
  }

  const createNewBoard = async ({
    boardTitle,
    boardDescription,
    token
  }: {
    boardTitle: string
    boardDescription: string
    token: string
  }) => {
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
  return { fetchBoards, createNewBoard }
}
