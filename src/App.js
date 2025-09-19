import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import NotFound from './components/NotFound'
import PlaylistsDetails from './components/PlaylistsDetails'
import CategoryPlaylistsDetails from './components/CategoryPlaylistsDetails'
import AlbumDetails from './components/AlbumDetails'
import './App.css'

const App = props => {
  const {location} = props
  const showSidebar = location.pathname !== '/login'

  return (
    <div className="app-container">
      {showSidebar && <Sidebar />}
      <div className="main-content">
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/playlist/:id"
            component={PlaylistsDetails}
          />
          <ProtectedRoute
            exact
            path="/category/:id/playlists"
            component={CategoryPlaylistsDetails}
          />
          <ProtectedRoute exact path="/album/:id" component={AlbumDetails} />
          <Route exact path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(App)
