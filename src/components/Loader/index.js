import React from 'react'
import './index.css'

const Loader = () => {
  return (
    <div className="loader-container" data-testid="loader">
      <div className="loader-card">
        <img
          className="loader-logo"
          src="https://res.cloudinary.com/dqstchmvc/image/upload/v1758133026/music_gfyhde.png"
          alt="loader"
        />
        <h1 className="loader-heading">Loading...</h1>
      </div>
    </div>
  )
}
export default Loader
