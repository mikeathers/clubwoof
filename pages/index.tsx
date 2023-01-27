import Link from 'next/link'

function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <br />
      <Link href="/auth/register">Register</Link>
      <br />
      <br />
      <Link href="/auth/login">Login</Link>
    </div>
  )
}

export default Home
