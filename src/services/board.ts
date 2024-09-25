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

      const boards = await response.json()

      return boards
    } catch (error) {
      console.error(error)
    }
  }
  return { fetchBoards, createNewBoard }
}
