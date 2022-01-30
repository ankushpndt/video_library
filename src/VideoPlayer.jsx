import { useParams } from 'react-router-dom';
import { useState } from 'react';
import YouTube from 'react-youtube';
import './Videos.css';
import { useData } from './Context/DataContext';
import { Modal } from './Components/Modal';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {
  addToHistory,
  addToWatchLater,
  addToLikedVideos,
} from './utils/ApiCall';
import { useAuth } from './Context/AuthContext';
export const VideoPlayer = () => {
  const [sizeOfWindow, setSizeOfWindow] = useState(window.innerWidth);
  const { videoList, dispatch } = useData();
  const { videoId } = useParams();
  const getVideoDetails = (videos, videoId) =>
    videos?.find((video) => video.videoId === videoId);
  const video = getVideoDetails(videoList, videoId);
  const opts = {
    height: sizeOfWindow > 900 ? '550' : '300',
    // width: '853',
    width: '100%',
    // height: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  window.onresize = () => {
    setSizeOfWindow(window.innerWidth);
  };

  const { token } = useAuth();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <main>
      <div className='video__player'>
        <div className='video__responsive'>
          <div className='youtube__player'>
            <YouTube
              className='y__player'
              videoId={`${videoId}`}
              opts={opts}
              onPlay={() => addToHistory({ dispatch, _id: video?._id, token })}
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
              <ThumbUpAltIcon
                onClick={() =>
                  addToLikedVideos({ dispatch, token, _id: video?._id })
                }
              />

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
