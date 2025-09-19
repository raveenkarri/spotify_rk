import {useEffect, useState} from 'react'
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

const PlaylistsDetails = ({match, history}) => {
  const [playList, setPlayList] = useState(null)
  const [error, setError] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)
  const {id} = match.params

  const fetchPlaylistDetails = async () => {
    try {
      const res = await fetch(
        `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`,
      )
      const data = await res.json()
      if (!res.ok) {
        setError(true)
      } else {
        setPlayList(data)
        console.log(data)
      }
    } catch (err) {
      console.log(err.message)
      setError(true)
    }
  }

  useEffect(() => {
    fetchPlaylistDetails()
  }, [])

  if (error) return <FailureView onClickTryAgain={fetchPlaylistDetails} />
  if (!playList) return <Loader />

  return (
    <div className="playlist-details-container">
      <button className="back-button" onClick={() => history.push('/')}>
        Back
      </button>

      <div className="playlist-info">
        <img
          className="playlist-image"
          src={playList.images?.[0]?.url}
          alt={playList.name}
        />
        <div>
          <p className="playlist-type">Editor's picks</p>
         
          <p className="playlist-description">{playList.description}</p>
        </div>
      </div>

      <div className="playlist-header">
        <p>#</p>
        <p>Track</p>
        <p>Album</p>
        <p>Time</p>
        <p>Artist</p>
        <p>Added</p>
      </div>
      <hr />

      <ul className="playlist-tracks">
        {playList.tracks?.items?.map((item, i) => (
          <li
            key={item.track.id}
            className={`playlist-item ${
              currentSong === item.track.preview_url ? 'playing' : ''
            }`}
            onClick={() => setCurrentSong(item.track.preview_url)}
            data-testid={`track-${item.track.id}`}
          >
            <p>{i + 1}</p>
            <p>{item.track?.name}</p>
            <p>{item.track?.album?.name}</p>
            <p>{formatDuration(item.track?.duration_ms)}</p>
            <p>{item.track?.artists?.map(a => a.name).join(', ')}</p>
            <p>{moment(item.added_at).fromNow()}</p>
          </li>
        ))}
      </ul>

      <div className="audio-player">
        <div className="now-playing-default">
          <img src={playList.images?.[0]?.url} alt={playList.name} />
          <p>{playList.name}</p>
        </div>

        {currentSong && <audio src={currentSong} controls autoPlay />}
      </div>
    </div>
  )
}

export default PlaylistsDetails
// <h1 className="playlist-name">{playList.name}</h1>