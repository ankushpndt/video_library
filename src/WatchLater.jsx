import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from './Context/DataContext';
import { getWatchLater, deleteFromWatchLater } from './utils/ApiCall';
import { useAuth } from './Context/AuthContext';
export const WatchLater = () => {
  const { watchLater, dispatch, videoList } = useData();
  const { token } = useAuth();
  const extractVideoFromWatchLater = videoList?.filter((video) => {
    return watchLater?.find((el) => el._id === video._id);
  });
  useEffect(() => {
    getWatchLater(dispatch, token);
  }, [dispatch]);
  return (
    <main>
      <h1>Watch Later</h1>
      <div className='video__item'>
        <ul>
          {extractVideoFromWatchLater?.map((video, i) => {
            return (
              <div className='container' key={i}>
                <button
                  className='remove__btn'
                  onClick={() =>
                    deleteFromWatchLater({ dispatch, token, _id: video?._id })
                  }
                >
                  <i className='fas fa-trash' style={{ color: 'white' }}></i>
                </button>
                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    display: 'grid',
                    marginBottom: '1rem',
                  }}
                  to={`/video/${video?.id}`}
                  key={video?.id}
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
};