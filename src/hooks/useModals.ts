import useModalStore from '@/store/ModalStore'

export function useModals() {
  const { toggleModal } = useModalStore()
  const handleBoardSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const taskData = {
      taskTitle: formData.get('taskTitle') as string,
      taskDescription: formData.get('taskDescription') as string,
      priority: formData.get('priority') as string,
      status: selectedColumn,
      endDate: formData.get('taskEndDate') as string,
      boardId: id
    }
    createNewTask(taskData)
    toggleModal('createTask')
    setSelectedColumn('')
  }

  return {
    handleBoardSubmit
  }
}
