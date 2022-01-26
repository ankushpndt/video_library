import React, { useEffect } from 'react';
import { useData } from './Context/DataContext';
import { Link } from 'react-router-dom';
import './Videos.css';
import { getPlaylist } from './utils/ApiCall';
import { useAuth } from './Context/AuthContext';

export const Playlist = () => {
  const { dispatch, playlist, videoList } = useData();
  const { token, userId } = useAuth();
  useEffect(() => {
    getPlaylist({ dispatch, token, userId });
  }, [dispatch, token]);
  let extractVideosFromPlaylist;
  for (let i of playlist) {
    extractVideosFromPlaylist = videoList?.filter((video) => {
      return i.videos?.find((el) => {
        return el === video._id;
      });
    });
  }
  return (
    <main>
      <h1>Playlist</h1>
      <div className='video__item'>
        <ul>
          {extractVideosFromPlaylist?.map((video, i) => {
            return (
              <div className='playlist' key={i}>
                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    display: 'grid',
                    marginBottom: '1rem',
                  }}
                  to={`/video/${video.videoId}`}
                  key={video.id}
                >
                  {' '}
                  <div className='video__body' key={i}>
                    <img
                      src={video.image}
                      width='370'
                      height=' auto'
                      alt='error'
                    />
                    <div style={{ marginTop: '1rem' }}>{video?.title}</div>
                    <p>
                      {video?.views} • <span>{video?.date}</span>
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </main>
  );
};
