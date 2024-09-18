import { useBoards } from '@/hooks/useBoards'
import { Board } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { BoardItem } from './BoardItem'
import { MainContent } from './MainContent'

export const BoardsContainer = () => {
  const { userId } = useAuth()

  const { boards } = useBoards({ userId })

  console.log(boards)

  const handleClick = () => {
    //TODO: desplegar un modal preguntando si esta seguro
    console.log('Remove board')
  }

  return (
    <MainContent style="p-4">
      <div className="h-full w-full rounded-md bg-zinc-950 p-10">
        {boards.map((board: Board) => (
          <BoardItem board={board} onClick={handleClick} />
        ))}
      </div>
    </MainContent>
  )
}
