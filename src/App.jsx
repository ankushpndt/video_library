import './styles.css';
import './Videos.css';
import { useEffect, useState } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { Videos } from './Videos';
import { Playlist } from './Pages/Playlist/Playlist';
import { User } from './Pages/Account/User';
import { NavLink, Route, Routes, Link } from 'react-router-dom';
import { WatchLater } from './Pages/Watch Later/WatchLater';
import LikedVideos from './Pages/Liked Videos/LikedVideos';
import { History } from './Pages/History/History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Login } from './Pages/Account/Login';
import { SignUp } from './Pages/Account/SignUp';
import { PrivateRoute } from './Components/PrivateRoute';
import { useAuth } from './Context/AuthContext';
import { useData } from './Context/DataContext';
import { getHistory, getVideos } from './utils/ApiCall';
import { Searchbar } from './Components/Searchbar';
export const App = () => {
  const { userLogout, login, token } = useAuth();

  const { dispatch } = useData();
  console.log(login?.isUserLoggedIn);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getVideos(dispatch);
    getHistory(dispatch, token);
  }, [dispatch]);
  return (
    <div className='App'>
      <div className='app__body'>
        <header
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '1rem',
          }}
        >
          <Searchbar />
        </header>
        <aside className='aside'>
          <Link to='/' className='logo'>
            <PlayCircleIcon />
          </Link>
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
          </NavLink>
          <NavLink className='video__route' to='/likedVideos'>
            <ThumbUpIcon />{' '}
            <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
              Liked Videos
            </span>
          </NavLink>{' '}
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
          {login ? (
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
          ) : (
            ''
          )}
        </aside>
        <div className='mobile__menu'>
          <div className='m__menu'>
            <Link to='/' className='logo'>
              <PlayCircleIcon />
            </Link>
            <button
              className='open__menu'
              onClick={() => setOpen((open) => !open)}
            >
              <MenuIcon />
            </button>{' '}
          </div>
          <div
            className={open ? 'menu__drawer__active' : 'menu__drawer'}
            onClick={() => setOpen(false)}
          >
            <ul className='menu'>
              <li>
                {' '}
                <NavLink className='menu__link' to='/'>
                  <HomeIcon />
                  <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
                    Home
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className='menu__link' to='/playlist'>
                  <PlaylistAddIcon />
                  <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
                    Playlist
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className='menu__link' to='/history'>
                  <HistoryIcon />
                  <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
                    History
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className='menu__link' to='/watchLater'>
                  <WatchLaterIcon />
                  <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
                    Watch Later
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className='menu__link' to='/likedVideos'>
                  <ThumbUpIcon />{' '}
                  <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
                    Liked Videos
                  </span>
                </NavLink>{' '}
              </li>
              <li>
                <NavLink className='menu__link' to='/user'>
                  <AccountCircleIcon />
                  <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
                    User
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className='menu__link' to='/login'>
                  <AccountCircleIcon />
                  <span style={{ fontSize: '1.2rem', paddingLeft: '0.5rem' }}>
                    Login
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className='menu__link'
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
              </li>
              <li>
                {login ? (
                  <NavLink
                    className='menu__link'
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
                ) : (
                  ''
                )}
              </li>
            </ul>
          </div>
        </div>
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
};
