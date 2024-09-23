import { Board } from '@/types'

interface Props {
  board: Board
  onDelete: ({ boardId }: { boardId: string }) => void
}

export const BoardItem = ({ board, onDelete }: Props) => {
  return (
    <div className="max-h-fit max-w-fit">
      <div className="group relative col-span-12 max-w-fit rounded-lg border border-solid border-gray-200 bg-zinc-950 p-4 shadow-none transition-all duration-300 hover:shadow-lg hover:shadow-gray-400 md:col-span-6 lg:col-span-3">
        <h4 className="mb-2 text-xl font-semibold capitalize text-gray-100 transition-all duration-500 group-hover:text-gray-50">
          {board.boardTitle}
        </h4>
        <p className="text-md mb-6 font-normal leading-5 text-gray-400 transition-all duration-500">
          {board.boardDesc}
        </p>
        <div className="inline-flex w-full items-center justify-start gap-4">
          <button className="text-md inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white shadow-sm">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.45454 13.8454C1.84662 12.7241 1.84662 11.365 2.45454 10.2437C4.29529 6.8486 7.87972 4.54456 12 4.54456C16.1203 4.54456 19.7047 6.8486 21.5455 10.2437C22.1534 11.365 22.1534 12.7241 21.5455 13.8454C19.7047 17.2405 16.1203 19.5446 12 19.5446C7.87972 19.5446 4.29529 17.2405 2.45454 13.8454Z"
                stroke="white"
                strokeWidth="1.6"
                className="my-path"
              ></path>
              <path
                d="M15.0127 12C15.0127 13.6569 13.6695 15 12.0127 15C10.3558 15 9.0127 13.6569 9.0127 12C9.0127 10.3431 10.3558 9 12.0127 9C13.6695 9 15.0127 10.3431 15.0127 12Z"
                stroke="white"
                strokeWidth="1.6"
                className="my-path"
              ></path>
            </svg>
            Open
          </button>

          <button
            className="text-md inline-flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-5 py-2 font-semibold text-white shadow-sm"
            onClick={() => onDelete({ boardId: board.boardId })}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6.60001H21M4.8 6.60001H19.2V15C19.2 17.8284 19.2 19.2426 18.3213 20.1213C17.4426 21 16.0284 21 13.2 21H10.8C7.97157 21 6.55736 21 5.67868 20.1213C4.8 19.2426 4.8 17.8284 4.8 15V6.60001Z"
                stroke="#ffffff"
                strokeWidth="null"
                strokeLinecap="round"
                className="my-path"
              ></path>
              <path
                d="M7.49994 6.59994V4.99994C7.49994 3.89537 8.39537 2.99994 9.49994 2.99994H14.4999C15.6045 2.99994 16.4999 3.89537 16.4999 4.99994V6.59994M16.4999 6.59994H2.99994M16.4999 6.59994H21"
                stroke="#ffffff"
                strokeWidth="null"
                strokeLinecap="round"
                className="my-path"
              ></path>
              <path
                d="M10.2 11.1L10.2 16.5"
                stroke="#ffffff"
                strokeWidth="null"
                strokeLinecap="round"
                className="my-path"
              ></path>
              <path
                d="M13.8 11.1L13.8 16.5"
                stroke="#ffffff"
                strokeWidth="null"
                strokeLinecap="round"
                className="my-path"
              ></path>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
