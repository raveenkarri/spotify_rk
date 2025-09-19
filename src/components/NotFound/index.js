import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <img
          className="notfound-image"
          src="https://res.cloudinary.com/dqstchmvc/image/upload/v1758135055/Frame_153_1_upey7w.png"
          alt="page not found"
        />
        <h1 className="notfound-text">Page Not Found</h1>
        <Link to="/">
          <button type="button" className="notfound-home-button">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  )
}
export default NotFound
