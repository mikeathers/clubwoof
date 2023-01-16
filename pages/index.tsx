import Link from 'next/link'

function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <Link href="/auth/register">Register</Link>
    </div>
  )
}

export default Home
