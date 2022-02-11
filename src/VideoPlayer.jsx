import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import './Videos.css';
import { useData } from './Context/DataContext';
import { Modal } from './Components/Modal';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import {
  addToHistory,
  addToWatchLater,
  addToLikedVideos,
  getLikedVideos,
  getVideos,
} from './utils/ApiCall';
import { useAuth } from './Context/AuthContext';

export const VideoPlayer = () => {
  // const [sizeOfWindow, setSizeOfWindow] = useState(window.innerWidth);
  const { videoList, dispatch, likedVideo } = useData();
  const { videoId } = useParams();
  const getVideoDetails = (videos, videoId) =>
    videos?.find((video) => video.videoId === videoId);
  const video = getVideoDetails(videoList, videoId);
  const opts = {
    // height: sizeOfWindow > 900 ? '550' : '300',
    // width: '853',
    // width: '70%',
    // height: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  // window.onresize = () => {
  //   setSizeOfWindow(window.innerWidth);
  // };
  const extractedVideo = videoList?.find((el) => el.videoId === videoId);

  const likedByUser = extractedVideo?.likedByUser;
  console.log(likedByUser);
  const { token, login, userId } = useAuth();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    login ? setModal(!modal) : navigate('/login');
  };
  useEffect(() => {
    getLikedVideos(dispatch, token);
  }, [dispatch, token]);

  return (
    <main>
      <div className='video__player'>
        <div className='video__responsive'>
          <div className='youtube__player'>
            <YouTube
              className='y__player'
              videoId={`${videoId}`}
              opts={opts}
              onPlay={() =>
                login
                  ? addToHistory({ dispatch, _id: video?._id, token })
                  : navigate('/login')
              }
            />
          </div>
        </div>
        <ul>
          <div style={{ marginTop: '1rem' }}>{video?.title}</div>
          <div className='info'>
            <p style={{ color: 'gray' }}>
              {video?.views} • <span>{video?.date}</span>
            </p>
            <span className='like__btn'>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {likedByUser?.find((el) => el === userId) ? (
                  <ThumbUpAltIcon
                    onClick={() => {
                      if (login) {
                        addToLikedVideos({ dispatch, _id: video?._id, token });
                        getVideos(dispatch);
                      } else {
                        navigate('/login');
                      }
                    }}
                  />
                ) : (
                  <ThumbUpAltOutlinedIcon
                    onClick={() => {
                      if (login) {
                        addToLikedVideos({ dispatch, _id: video?._id, token });
                        getVideos(dispatch);
                      } else {
                        navigate('/login');
                      }
                    }}
                    s
                  />
                )}
                <div className='like__length' style={{ paddingLeft: '0.4rem' }}>
                  {likedByUser?.length > 0 ? likedByUser?.length : 0}
                </div>
              </span>
              <ThumbDownAltIcon />
              <WatchLaterIcon
                onClick={() =>
                  addToWatchLater({ dispatch, token, _id: video?._id })
                }
              />

              <button className=' playlist__btn' onClick={toggleModal}>
                <PlaylistAddIcon />
              </button>
            </span>
          </div>
          {modal && (
            <Modal toggleModal={toggleModal} modal={modal} videoId={videoId} />
          )}
        </ul>
      </div>
    </main>
  );
};
