import Link from 'next/link'

const Home = () => (
  <div>
    <h1>Home page</h1>
    <Link href={'/account/register'}>Register</Link>
  </div>
)

export default Home
