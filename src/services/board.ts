// import { Board } from '@/types'
// import { BASE_API_ENDPOINT } from '@/config'

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
      const response = await fetch(`http://localhost:3000/api/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ boardTitle, boardDescription })
      })

      const newBoard = await response.json()

      return newBoard
    } catch (error) {
      console.error(error)
    }
  }

  const deleteBoard = async ({ token, boardId }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/boards/${boardId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log(await response.json())
    } catch (error) {
      console.log(error)
    }
  }
  return { fetchBoards, createNewBoard, deleteBoard }
}
