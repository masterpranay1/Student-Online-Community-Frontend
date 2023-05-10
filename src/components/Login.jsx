const Login = ({admin}) => {
  return (
      <div>
          {
              admin ? <h1>Admin Login</h1> : <h1>Login</h1>
          }
      </div>
  )
}

export default Login