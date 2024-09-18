import Container from '@/components/Container'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <Container>
        <h1 className="text-5xl font-bold text-white">
          Oops! Something went wrong...
        </h1>
        <p className="mt-8 text-2xl text-gray-400">
          {error.status} - {error.statusText}
        </p>
        <iframe
          className="mt-4"
          src="https://giphy.com/embed/NTur7XlVDUdqM"
          width="480"
          height="269"
          allowFullScreen
        ></iframe>
        <Link
          to="/"
          className="group relative m-6 w-max font-semibold text-indigo-50"
        >
          <span className="text-2xl">Go back home</span>
          <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-3/6"></span>
          <span className="absolute -bottom-1 right-1/2 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-3/6"></span>
        </Link>
      </Container>
    )
  } else {
    return <div>Oops! Something went wrong...</div>
  }
}

export default ErrorPage
