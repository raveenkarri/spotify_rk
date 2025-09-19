import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {history} = props

  const submitHandler = async e => {
    e.preventDefault()
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({username, password}),
      }
      const res = await fetch('https://apis.ccbp.in/login', options)
      const data = await res.json()
      if (res.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 7})
        history.replace('/')
        console.log('Login Success:', data)
      } else {
        setError(data.error_msg || 'Login failed')
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  if (Cookies.get('jwt_token')) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-container">
      <div className="login-form-container">
        <img
          className="login-logo"
          src="https://res.cloudinary.com/dqstchmvc/image/upload/v1758133026/music_gfyhde.png"
          alt="login website logo"
        />
        <h1 className="login-heading">Spotify Remix</h1>
        <form onSubmit={submitHandler} className="login-form">
          <label htmlFor="username" className="login-form-label">
            USERNAME
          </label>
          <input
            id="username"
            className="login-form-input"
            type="text"
            value={username}
            onChange={e => setUserName(e.target.value)}
          />
          <label htmlFor="password" className="login-form-label">
            PASSWORD
          </label>
          <input
            id="password"
            className="login-form-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p className="login-error">{error}</p>}
          <button className="login-button" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  )
}
export default Login
