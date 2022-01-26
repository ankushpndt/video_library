import { Link } from 'react-router-dom';
import './History.css';
import { useData } from './Context/DataContext';
import { useAuth } from './Context/AuthContext';
import { deleteFromHistory } from './utils/ApiCall';
import { useEffect } from 'react';
import { getHistory } from './utils/ApiCall';
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
      <div className='history__item'>
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
                  <i className='fas fa-trash'></i>
                </button>
                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    backgroundColor: '#f3f4f6',
                    display: 'grid',
                    marginBottom: '1rem',
                    padding: '1rem',
                    width: '45vw',
                  }}
                  to={`/video/${video?.videoId}`}
                  key={i}
                >
                  {' '}
                  <div className='history__body'>
                    <img
                      src={video?.image}
                      width='220'
                      height='138'
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
