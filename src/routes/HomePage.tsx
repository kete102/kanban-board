import { MainContent } from '@/components/MainContent'
import { SignedIn, UserButton } from '@clerk/clerk-react'
import {
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
      <div className="flex h-full flex-col">
        <section className="mx-4 flex items-center justify-between p-4 text-right">
          <button
            className="group relative inline-block"
            onClick={handleOnClick}
          >
            <span className="items-centrer relative z-10 flex justify-center overflow-hidden rounded-lg border-2 border-indigo-600 px-3.5 py-2 font-medium leading-tight text-indigo-600 transition-colors duration-300 ease-out group-hover:text-white">
              <span className="absolute inset-0 h-full w-full rounded-lg bg-gray-50 px-5 py-3"></span>
              <span className="ease absolute left-0 -ml-2 h-40 w-40 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-indigo-600 transition-all duration-300 group-hover:-rotate-180"></span>
              <span className="relative text-lg font-semibold">New board</span>
            </span>
            <span
              className="absolute bottom-0 right-0 -mb-1 -mr-1 h-9 w-full rounded-lg bg-indigo-600 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </button>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-12 h-12'
                },
                variables: {
                  fontSize: 'text-lg',
                  colorText: 'white'
                }
              }}
              showName={true}
            />
          </SignedIn>
        </section>
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
                    <button
                      type="button"
                      className="shadow-xs cursor-pointer rounded-lg bg-indigo-500 px-6 py-2.5 text-center text-lg font-semibold text-white transition-all duration-500 hover:bg-indigo-700"
                      onClick={handleAddNewBoard}
                    >
                      Create
                    </button>

                    <button
                      type="button"
                      className="shadow-xs cursor-pointer rounded-lg bg-indigo-50 px-6 py-2.5 text-center text-lg font-semibold text-indigo-500 transition-all duration-500 hover:bg-indigo-100"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
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
