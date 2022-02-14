import { Link } from 'react-router-dom';
import './History.css';
import { useData } from '../../Context/DataContext';
import { getHistory, deleteFromHistory } from '../../utils/ApiCall';
import { useAuth } from '../../Context/AuthContext';
import { useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
export const History = () => {
  const { history, dispatch, videoList } = useData();
  const { token } = useAuth();
  const extractVideoFromHistory = videoList?.filter((video) => {
    return history?.find((el) => el._id === video._id);
  });
  useEffect(() => {
    if (token) {
      getHistory(dispatch, token);
    }
  }, [dispatch, token]);
  return (
    <main>
      <h1>History</h1>
      <div className='video__item'>
        <ul>
          {extractVideoFromHistory?.length > 0 ? (
            extractVideoFromHistory?.map((video, i) => {
              return (
                <div className='container' key={i}>
                  <button
                    className='liked__remove__btn'
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
                    <div className='liked__video__body'>
                      <img src={video?.image} alt='error' />
                      <div className='history__info'>
                        <div>{video?.title}</div>
                        <p>{video?.views}</p>
                      </div>
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
