import { mockBoard } from '@/mock/mockBoards'
import { Board } from '@/types'

interface Props {
  userId: string
}

const boards: Board[] = [mockBoard]

export async function FetchBoards({ userId }: Props) {
  try {
    //TODO: Aqui va la llamda a mongo
    console.log('LLamada a MonogDB', userId)
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
