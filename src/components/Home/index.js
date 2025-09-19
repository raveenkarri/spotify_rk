import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Loader from '../Loader'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const Home = () => {
  const [featureList, setFeatureList] = useState([])
  const [apiStatusFeature, setApiStatusFeature] = useState(
    apiStatusConstants.initial,
  )

  const [categories, setCategories] = useState([])
  const [apiStatusCategories, setApiStatusCategories] = useState(
    apiStatusConstants.initial,
  )

  const [newReleases, setNewReleases] = useState([])
  const [apiStatusNewReleases, setApiStatusNewReleases] = useState(
    apiStatusConstants.initial,
  )

  const fetchData = async (url, setData, setStatus, transformFn) => {
    setStatus(apiStatusConstants.loading)
    try {
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setData(transformFn(data))
        setStatus(apiStatusConstants.success)
      } else {
        setStatus(apiStatusConstants.failure)
      }
    } catch {
      setStatus(apiStatusConstants.failure)
    }
  }

  const fetchFeatureList = () =>
    fetchData(
      'https://apis2.ccbp.in/spotify-clone/featured-playlists',
      setFeatureList,
      setApiStatusFeature,
      data => data.playlists.items,
    )

  const fetchCategories = () =>
    fetchData(
      'https://apis2.ccbp.in/spotify-clone/categories',
      setCategories,
      setApiStatusCategories,
      data => data.categories.items,
    )

  const fetchNewReleases = () =>
    fetchData(
      'https://apis2.ccbp.in/spotify-clone/new-releases',
      setNewReleases,
      setApiStatusNewReleases,
      data => data.albums.items,
    )

  useEffect(() => {
    fetchFeatureList()
    fetchCategories()
    fetchNewReleases()
  }, [])

  const renderFeatureList = () => (
    <ul className="home-list">
      {featureList.map(item => (
        <li key={item.id} className="home-list-item">
          <Link to={`/playlist/${item.id}`}>
            <img
              className="home-image"
              src={item.images?.[0]?.url}
              alt="featured playlist"
            />
          </Link>
          <h1 className="home-heading">{item.name}</h1>
        </li>
      ))}
    </ul>
  )

  const renderCategories = () => (
    <ul className="home-list">
      {categories.map(item => (
        <li key={item.id} className="home-list-item">
          <Link to={`/category/${item.id}/playlists`}>
            <img
              className="home-image"
              src={item.icons?.[0]?.url}
              alt="category"
            />
          </Link>
          <h1 className="home-heading">{item.name}</h1>
        </li>
      ))}
    </ul>
  )

  const renderNewReleases = () => (
    <ul className="home-list">
      {newReleases.map(item => (
        <li key={item.id} className="home-list-item">
          <Link to={`/album/${item.id}`}>
            <img
              className="home-image"
              src={item.images?.[0]?.url}
              alt="new release album"
            />
          </Link>
          <h1 className="home-heading">{item.name}</h1>
        </li>
      ))}
    </ul>
  )

  const renderDetails = (apiStatus, renderJsx, retryFunction) => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return <Loader />
      case apiStatusConstants.success:
        return renderJsx()
      case apiStatusConstants.failure:
        return <FailureView onClickTryAgain={retryFunction} />
      default:
        return null
    }
  }

  return (
    <div className="home-main-container">
      <div>
        <h1 className="home-main-heading">Editor's picks</h1>
        {renderDetails(apiStatusFeature, renderFeatureList, fetchFeatureList)}
      </div>
      <div>
        <h1 className="home-main-heading">Genres & Moods</h1>
        {renderDetails(apiStatusCategories, renderCategories, fetchCategories)}
      </div>
      <div>
        <h1 className="home-main-heading">New releases</h1>
        {renderDetails(
          apiStatusNewReleases,
          renderNewReleases,
          fetchNewReleases,
        )}
      </div>
    </div>
  )
}

export default Home
