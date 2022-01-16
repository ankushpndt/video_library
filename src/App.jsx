import './styles.css';
import './Videos.css';
import { VideoPlayer } from './VideoPlayer';
import { Videos } from './Videos';
import { Playlist } from './Playlist';
import { User } from './Pages/Account/User';
import { NavLink, Route, Routes } from 'react-router-dom';
import WatchLater from './WatchLater';
import LikedVideos from './LikedVideos';
import History from './History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Login } from './Pages/Account/Login';
import { SignUp } from './Pages/Account/SignUp';
import { PrivateRoute } from './Components/PrivateRoute';
import { useAuth } from './Context/AuthContext';
export default function App() {
  const { userLogout } = useAuth();
  return (
    <div className='App'>
      <div className='app__body'>
        <header>
          <h1>Videos</h1>
        </header>
        <aside>
          <NavLink end className='video__route' to='/'>
            <HomeIcon />
            <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
              Home
            </span>
          </NavLink>
          <NavLink className='video__route' to='/playlist'>
            <PlaylistAddIcon />
            <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
              Playlist
            </span>
          </NavLink>
          <NavLink className='video__route' to='/history'>
            <HistoryIcon />
            <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
              History
            </span>
          </NavLink>
          <NavLink className='video__route' to='/watchLater'>
            <WatchLaterIcon />
            <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
              Watch Later
            </span>
            {/* <i className='far fa-clock'></i> Watch Later{' '} */}
          </NavLink>
          <NavLink className='video__route' to='/likedVideos'>
            <ThumbUpIcon />{' '}
            <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
              Liked Videos
            </span>
          </NavLink>
          <NavLink className='video__route' to='/user'>
            <AccountCircleIcon />
            <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
              User
            </span>
          </NavLink>
          <NavLink className='video__route' to='/login'>
            <AccountCircleIcon />
            <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
              Login
            </span>
          </NavLink>
          <NavLink
            className='video__route'
            activestyle={{
              fontWeight: 'bold',
            }}
            to='/signup'
          >
            <AccountCircleIcon />
            <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
              SignUp
            </span>
          </NavLink>
          <NavLink
            className='video__route'
            activestyle={{
              fontWeight: 'bold',
            }}
            to='/login'
            onClick={userLogout}
          >
            <LogoutIcon />
            <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
              Logout
            </span>
          </NavLink>
        </aside>
        <Routes>
          <Route
            path='/'
            element={
              <main>
                <Videos />
              </main>
            }
          />

          <Route
            path='/playlist'
            element={
              <PrivateRoute>
                <Playlist />
              </PrivateRoute>
            }
          />
          <Route path='/video/:videoId' element={<VideoPlayer />} />
          <Route
            path='/history'
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path='/watchLater'
            element={
              <PrivateRoute>
                <WatchLater />
              </PrivateRoute>
            }
          />
          <Route
            path='/likedVideos'
            element={
              <PrivateRoute>
                <LikedVideos />
              </PrivateRoute>
            }
          />
          <Route path='/user' element={<User />} />
          <Route
            path='/login'
            element={
              <main>
                <Login />
              </main>
            }
          />
          <Route
            path='/signup'
            element={
              <main>
                <SignUp />
              </main>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
