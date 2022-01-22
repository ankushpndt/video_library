import { Link } from 'react-router-dom';
import './Videos.css';
import { useData } from './Context/DataContext';
export const Videos = () => {
  const { videoList } = useData();

  return (
    <div className='video__item'>
      <ul>
        {videoList?.map(({ title, videoId, date, views, image }, i) => {
          return (
            <div className='video__list' key={i}>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  display: 'grid',
                  marginBottom: '1rem',
                }}
                to={`/video/${videoId}`}
              >
                {' '}
                <div className='video__body'>
                  <img src={image} width='370' height=' auto' alt='error' />
                  <div style={{ marginTop: '1rem' }}>{title}</div>
                  <p>
                    {views} • <span>{date}</span>
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
