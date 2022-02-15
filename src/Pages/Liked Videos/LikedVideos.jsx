import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import '../../Videos.css';
import { useData } from '../../Context/DataContext';
import {
  getLikedVideos,
  deleteFromLikedVideos,
  addToLikedByUser,
} from '../../utils/ApiCall';
import { useAuth } from '../../Context/AuthContext';

import DeleteIcon from '@mui/icons-material/Delete';
export const LikedVideos = () => {
  const { likedVideo, dispatch, videoList } = useData();
  const { token, userId } = useAuth();
  const extractVideoFromLikedVideos = videoList?.filter((video) => {
    return likedVideo?.find((el) => el._id === video._id);
  });

  useEffect(() => {
    if (token) {
      getLikedVideos(dispatch, token);
    }
  }, [dispatch, token]);
  return (
    <main>
      <h1>Liked Videos</h1>
      <div className='video__item'>
        <ul className='history__list'>
          {extractVideoFromLikedVideos.length !== 0 ? (
            extractVideoFromLikedVideos.map((video, i) => {
              return (
                <div className='container' key={i}>
                  <button
                    className='liked__remove__btn'
                    onClick={() => {
                      deleteFromLikedVideos({
                        dispatch,
                        token,
                        _id: video?._id,
                      });
                      addToLikedByUser({
                        dispatch,
                        _id: video?._id,
                        token,
                        userId,
                      });
                    }}
                  >
                    <DeleteIcon />
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
                    <div className='liked__video__body'>
                      <img src={video?.image} alt='error' />
                      <div style={{ width: '100%', paddingTop: '1rem' }}>
                        {video?.title}
                      </div>
                      <p>
                        {video?.views} • <span>{video?.date}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className='empty__text'>There is no video here.</div>
          )}
        </ul>
      </div>
    </main>
  );
};
