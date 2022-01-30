import { Link } from 'react-router-dom';
import './History.css';

import { useData } from './Context/DataContext';
import { useAuth } from './Context/AuthContext';
import { deleteFromHistory } from './utils/ApiCall';
import { useEffect } from 'react';
import { getHistory } from './utils/ApiCall';
import DeleteIcon from '@mui/icons-material/Delete';
export const History = () => {
  const { history, dispatch, videoList } = useData();
  const { token } = useAuth();
  const extractVideoFromHistory = videoList?.filter((video) => {
    return history?.find((el) => el._id === video._id);
  });
  useEffect(() => {
    getHistory(dispatch, token);
  }, [dispatch, token]);
  return (
    <main>
      <h1>History</h1>
      <div className='video__item'>
        <ul>
          {extractVideoFromHistory?.map((video, i) => {
            return (
              <div className='container' key={i}>
                <button
                  className='remove__btn'
                  onClick={() =>
                    deleteFromHistory({ dispatch, token, _id: video?._id })
                  }
                >
                  <DeleteIcon />
                </button>
                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    display: 'grid',
                  }}
                  to={`/video/${video?.videoId}`}
                  key={i}
                >
                  {' '}
                  <div className='history__body'>
                    <img
                      src={video?.image}
                      width='370'
                      height=' auto'
                      alt='error'
                    />
                    <div className='history__info'>
                      <div>{video?.title}</div>
                      <p>{video?.views}</p>
                    </div>
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
