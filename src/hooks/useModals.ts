import useModalStore from '@/store/ModalStore'
import { useBoards } from './useBoards'

export function useModals() {
  const { toggleModal } = useModalStore()
  const { addNewBoard } = useBoards()

  const handleSubmitBoard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const boardData = {
      boardTitle: formData.get('boardTitle') as string,
      boardDescription: formData.get('boardDescription') as string
    }
    addNewBoard(boardData)
    toggleModal('createBoard')
  }

  return {
    handleSubmitBoard
  }
}
