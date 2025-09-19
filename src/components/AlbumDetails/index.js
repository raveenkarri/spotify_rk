import { useEffect, useState } from 'react'
import moment from 'moment'
import FailureView from '../FailureView'
import Loader from '../Loader'
import './index.css'

const formatDuration = ms => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const AlbumDetails = ({ match, history }) => {
  const [album, setAlbum] = useState(null)
  const [error, setError] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)
  const { id } = match.params

  const fetchAlbumDetails = async () => {
    try {
      const res = await fetch(`https://apis2.ccbp.in/spotify-clone/album-details/${id}`)
      const data = await res.json()
      if (!res.ok) {
        setError(true)
      } else {
        setAlbum(data)
      }
    } catch (err) {
      console.log(err.message)
      setError(true)
    }
  }

  useEffect(() => {
    fetchAlbumDetails()
  }, [])

  if (error) return <FailureView onClickTryAgain={fetchAlbumDetails} />
  if (!album) return <Loader />

  return (
    <div className="album-details-container">
      <button className="album-back-button" onClick={() => history.push('/')}>
        Back
      </button>

      <div className="album-info">
        <img className="album-image" src={album.images?.[0]?.url} alt={album.name} />
        <div>
          <h1 className="album-name">{album.name}</h1>
          <p className="album-description">
            {album.artists?.map(a => a.name).join(', ')}
          </p>
        </div>
      </div>

      <div className="album-header">
        <p>#</p>
        <p>Track</p>
        <p>Time</p>
        <p>Artist</p>
      </div>
      <hr />

      <ul className="album-tracks">
        {album.tracks?.items?.map((item, i) => (
          <li
            key={item.id}
            className={`album-item ${currentSong === item.preview_url ? 'playing' : ''}`}
            onClick={() => setCurrentSong(item.preview_url)}
          >
            <p>{i + 1}</p>
            <p>{item.name}</p>
            <p>{formatDuration(item.duration_ms)}</p>
            <p>{item.artists?.map(a => a.name).join(', ')}</p>
          </li>
        ))}
      </ul>

      <div className="album-audio-player">
        <div className="album-now-playing-default">
          <img src={album.images?.[0]?.url} alt={album.name} />
          <p>{album.name}</p>
        </div>
        {currentSong && <audio src={currentSong} controls autoPlay />}
      </div>
    </div>
  )
}

export default AlbumDetails
