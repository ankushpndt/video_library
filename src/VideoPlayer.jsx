import { useParams } from 'react-router-dom';
import { usePlaylist } from './playlistContext';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import './Videos.css';
import { PlaylistAdd } from './PlaylistAdd';
import { useData } from './Context/DataContext';
import { addToHistory, getHistory, addToWatchLater } from './utils/ApiCall';
import { useAuth } from './Context/AuthContext';
export const VideoPlayer = () => {
  const [playlistWindow, setPlaylistWindow] = useState(false);
  const [sizeOfWindow, setSizeOfWindow] = useState(window.innerWidth);
  const { playlistDispatch, videoData } = usePlaylist();
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
  useEffect(() => {
    getHistory(dispatch, token);
  }, [dispatch]);
  const { token } = useAuth();
  console.log(video);
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
                playlistDispatch({
                  type: 'ADD_TO_LIKEDVIDEOS',
                  payload: { video },
                })
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
            <button
              className='playlist__btn'
              onClick={() =>
                // playlistDispatch({
                //   type: "ADD_VIDEO_TO_PLAYLIST",
                //   payload: { video }
                // })
                setPlaylistWindow(() => true)
              }
            >
              <img
                src='https://www.flaticon.com/svg/vstatic/svg/565/565264.svg?token=exp=1619181393~hmac=3f428053dcf40b92c068e102fc48613f'
                alt=''
              />
              Playlist
              {playlistWindow ? (
                <PlaylistAdd
                  video={video}
                  playlistWindow={playlistWindow}
                  setPlaylistWindow={setPlaylistWindow}
                />
              ) : (
                ''
              )}
            </button>
          </span>
        </div>
      </ul>
    </main>
  );
};
