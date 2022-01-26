import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import './Videos.css';
import { useData } from './Context/DataContext';
import { Modal } from './Components/Modal';
import {
  addToHistory,
  addToWatchLater,
  addToLikedVideos,
  getPlaylist,
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
    width: '853',
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
      <div className='video__responsive'>
        <YouTube
          videoId={`${videoId}`}
          opts={opts}
          onPlay={() => addToHistory({ dispatch, _id: video?._id, token })}
        />
      </div>
      <ul>
        <div style={{ marginTop: '1rem' }}>{video?.title}</div>
        <div className='info'>
          <p style={{ color: 'gray' }}>
            {video?.views} • <span>{video?.date}</span>
          </p>
          <span className='like__btn'>
            <i
              className='fas fa-thumbs-up'
              onClick={() =>
                addToLikedVideos({ dispatch, token, _id: video?._id })
              }
            ></i>
            <i className='fas fa-thumbs-down'></i>
            <i
              className='far fa-clock'
              onClick={() =>
                addToWatchLater({ dispatch, token, _id: video?._id })
              }
            >
              {' '}
              Later
            </i>
            <button className=' playlist__btn' onClick={toggleModal}>
              Playlist
            </button>
          </span>
        </div>
        {modal && (
          <Modal toggleModal={toggleModal} modal={modal} videoId={videoId} />
        )}
      </ul>
    </main>
  );
};
