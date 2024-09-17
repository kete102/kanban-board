import Container from '@/components/Container'

export const HomePage = () => {
  return (
    <Container>
      <h1 className="text-5xl font-bold text-white">Kanban Board</h1>
      <section className="justify-middle mt-10 flex h-[80dvh] w-full max-w-7xl flex-col rounded-md bg-black text-white"></section>
    </Container>
  )
}
