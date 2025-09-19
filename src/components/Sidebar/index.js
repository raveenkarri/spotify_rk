import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Sidebar = props => {
  const {history} = props

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="sidebar-container">
      <Link to="/">
        <img
          className="sidebar-logo"
          src="https://res.cloudinary.com/dqstchmvc/image/upload/v1758133026/music_gfyhde.png"
          alt="login website logo"
        />
      </Link>

      <div className="sidebar-logout-card">
        <button onClick={handleLogout} className="sidebar-logout-button">
          <img
            className="sidebar-logout-image"
            src="https://res.cloudinary.com/dqstchmvc/image/upload/v1758141220/log-out-04_1_mgfdxb.png"
            alt="logout"
          />
        </button>
        <p className="sidebar-logout-text">Logout</p>
      </div>
    </div>
  )
}
export default withRouter(Sidebar)
