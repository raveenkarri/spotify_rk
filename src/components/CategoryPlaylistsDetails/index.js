import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import FailureView from '../FailureView'
import Loader from '../Loader'
import './index.css'

const CategoryPlaylistsDetails = ({match}) => {
  const [categoryPlaylists, setCategoryPlaylists] = useState(null)
  const [error, setError] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)
  const {id} = match.params
  const history = useHistory()

  const fetchDetails = async () => {
    try {
      const res = await fetch(
        `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`,
      )
      const data = await res.json()
      if (!res.ok) {
        setError(true)
      } else {
        setCategoryPlaylists(data.playlists.items)
      }
    } catch (err) {
      console.log(err.message)
      setError(true)
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  const formatDuration = ms => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (error) return <FailureView onClickTryAgain={fetchDetails} />
  if (!categoryPlaylists) return <Loader />

  return (
    <div className="category-container">
      <button className="back-button" onClick={() => history.push('/')}>
        Back
      </button>

      <div className="category-playlists">
        {categoryPlaylists.map(playlist => (
          <div
            key={playlist.id}
            className="playlist-card"
            onClick={() => history.push(`/playlist/${playlist.id}`)}
            data-testid={`playlist-${playlist.id}`}
          >
            <img src={playlist.images?.[0]?.url} alt={playlist.name} />
            <p className="playlist-name">{playlist.name}</p>
            <p className="playlist-tracks-count">
              {playlist.tracks?.total} tracks
            </p>
          </div>
        ))}
      </div>

      <div className="audio-player">
        <div className="now-playing-default">
          <img src={categoryPlaylists[0]?.images?.[0]?.url} alt="category" />
          <p>Category: {id}</p>
        </div>
        {currentSong && <audio src={currentSong} controls autoPlay />}
      </div>
    </div>
  )
}

export default CategoryPlaylistsDetails
