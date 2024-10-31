export const ModalContainer = ({ children }) => {
  return (
    <div className="fixed inset-0 z-10 mx-auto grid h-full w-full max-w-md place-content-center md:max-w-xl">
      <div className="flex h-full flex-col items-center justify-start">
        {children}
      </div>
    </div>
  )
}
