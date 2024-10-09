// import { Board } from '@/types'
// import { BASE_API_ENDPOINT } from '@/config'

interface BoardFromApi {
  _id: string
  boardTitle: string
  boardDescription: string
}

export function boardActions() {
  const startFetchBoards = async ({ token }) => {
    console.log({ token })
    try {
      const response = await fetch(
        `https://kanban-baord-app-backend-production-f913.up.railway.app/api/boards`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.ok) {
        const { boards } = await response.json()
        if (!boards) {
          throw new Error('Error fetching user boards')
        }
        return boards.map((board: BoardFromApi) => {
          return {
            boardId: board._id,
            boardDescription: board.boardDescription,
            boardTitle: board.boardTitle
          }
        })
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching the user boards')
    }
  }

  const startCreateNewBoard = async ({
    boardTitle,
    boardDescription,
    token
  }: {
    boardTitle: string
    boardDescription: string
    token: string
  }) => {
    try {
      const response = await fetch(
        `https://kanban-baord-app-backend-production-f913.up.railway.app/api/boards`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ boardTitle, boardDescription })
        }
      )

      const newBoard = await response.json()

      return newBoard
    } catch (error) {
      console.error(error)
    }
  }

  const startDeleteBoard = async ({ token, boardId }) => {
    try {
      const response = await fetch(
        `https://kanban-baord-app-backend-production-f913.up.railway.app/api/boards/${boardId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(response)

      if (!response.ok) {
        return false
      }

      return await response.json()
    } catch (error) {
      console.log(error)
    }
  }
  return { startFetchBoards, startCreateNewBoard, startDeleteBoard }
}
