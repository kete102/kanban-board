import { Container } from '@/components'
import { GoArrowRight } from 'react-icons/go'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

export const ErrorPage = () => {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <Container>
        <div className="mx-auto grid h-dvh w-full place-content-center text-center">
          <h1 className="text-5xl font-bold text-black">
            Oops! Something went wrong...
          </h1>
          <p className="mt-8 text-2xl text-gray-500">
            {error.status} - {error.statusText}
          </p>
          <iframe
            className="mt-4 aspect-auto rounded-md px-2"
            src="https://giphy.com/embed/NTur7XlVDUdqM"
            width="400"
            height="200"
            allowFullScreen
          ></iframe>
          <Link
            to="/"
            className="mx-auto mt-8 inline-flex w-fit items-center justify-center gap-2 rounded-md border-2 border-zinc-950 bg-zinc-700 px-2 py-4 text-lg font-semibold text-zinc-50"
          >
            Go back home <GoArrowRight size={23} />
          </Link>
        </div>
      </Container>
    )
  } else {
    return <div>Oops! Something went wrong...</div>
  }
}
