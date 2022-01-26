import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import './Videos.css';
import { useData } from './Context/DataContext';
import { deleteFromLikedVideos } from './utils/ApiCall';
import { useAuth } from './Context/AuthContext';
import { getLikedVideos } from './utils/ApiCall';
export default function LikedVideos() {
  const { likedVideo, dispatch, videoList } = useData();
  const { token } = useAuth();
  const extractVideoFromLikedVideos = videoList?.filter((video) => {
    return likedVideo?.find((el) => el._id === video._id);
  });
  useEffect(() => {
    getLikedVideos(dispatch, token);
  }, [dispatch, token]);
  return (
    <main>
      <h1>Liked Videos</h1>
      <div className='video__item'>
        <ul>
          {extractVideoFromLikedVideos.map((video, i) => {
            return (
              <div className='container' key={i}>
                <button
                  className='remove__btn'
                  onClick={() =>
                    deleteFromLikedVideos({ dispatch, token, _id: video?._id })
                  }
                >
                  <i className='fas fa-trash'></i>
                </button>

                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    display: 'grid',
                    marginBottom: '1rem',
                  }}
                  to={`/video/${video?.videoId}`}
                  key={video.id}
                >
                  {' '}
                  <div className='video__body'>
                    <img
                      src={video?.image}
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
}
