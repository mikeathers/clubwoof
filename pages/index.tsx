function Home() {
  return (
    // <div>
    //   <h1>Home page</h1>
    //   <br />
    //   <Link href="/auth/register">Register</Link>
    //   <br />
    //   <br />
    //   <Link href="/auth/login">Login</Link>
    // </div>

    <div style={{height: '100vh'}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '16px',
        }}
      >
        <img
          style={{height: '180px', width: '180px'}}
          alt="logo"
          src={'https://clubwoof.co.uk/logo.png'}
        />

        <h1>Hi Mike 👋</h1>
        <p>Thanks for signing up!</p>
        <p>Click on the link to activate your account and get started</p>
        <a href="${props.FRONTEND_LINKS.SEND_CODE_POST_SIGN_UP}">clubwoof</a>
      </div>
    </div>
  )
}

export default Home
