import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import Container from './components/Container'

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
          className="mt-14 flex items-center justify-center gap-2 rounded-md p-3 text-4xl font-semibold text-white transition hover:bg-gray-600 hover:text-gray-50"
        >
          Go back to home
        </Link>
      </Container>
    )
  } else {
    return <div>Oops! Something went wrong...</div>
  }
}

export default ErrorPage
