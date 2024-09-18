//TODO: Esta pagina es para cuando ya estas logedIn
import { MainContent } from '@/components/MainContent'
import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Textarea
} from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOnClick = () => {
    console.log('new board')
    setIsModalOpen(true)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    console.log('Form submit', data)
  }

  const handleAddNewBoard = () => {
    setIsModalOpen(false)
  }

  return (
    <MainContent style={isModalOpen ? 'blur-sm bg-white/95' : ''}>
      <div className="h-full">
        <button
          onClick={handleOnClick}
          className="flex items-center gap-2 rounded-lg border-2 border-black p-2 text-2xl font-bold"
        >
          New Board
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <Dialog
          open={isModalOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 top-52 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="data-[closed]:transform-[scale(95%)] w-full max-w-lg rounded-xl bg-black/95 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
              >
                <form onSubmit={e => handleSubmit(e)}>
                  <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
                    <Legend className="text-2xl font-semibold text-white">
                      Create new board
                    </Legend>
                    <Field>
                      <Label className="text-lg font-medium text-white">
                        Cool board Name
                      </Label>
                      <Input
                        name="board-name"
                        className={clsx(
                          'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                      />
                    </Field>
                    <Field>
                      <Label className="text-2xl font-medium text-white">
                        Description
                      </Label>
                      <Description className="text-md/6 mt-2 text-white/50">
                        What's it about?
                      </Description>
                      <Textarea
                        name="board-description"
                        className={clsx(
                          'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        rows={3}
                      />
                    </Field>
                  </Fieldset>
                  <div className="mt-4 inline-flex gap-4">
                    <Button
                      className="rounded-md bg-gray-700 px-4 py-1.5 text-lg/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      type="submit"
                      onClick={handleAddNewBoard}
                    >
                      Add
                    </Button>
                    <Button
                      className="rounded-md bg-gray-700 px-4 py-1.5 text-lg/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </MainContent>
  )
}
