import { Link } from 'react-router-dom';
import './Videos.css';
import { useData } from './Context/DataContext';
import {Loader} from "./Components/Loader"
export const Videos = () => {
  const { videoList,loader } = useData();

  return (
    <div className='video__item'>
      {!loader?<ul className='video__item__list'>
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
                  <img src={image} className='video__body__image' alt='error' />
                  <div style={{ marginTop: '1rem' }}>{title}</div>
                  <p>
                    {views} • <span>{date}</span>
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </ul>:<Loader/>}
    </div>
  );
};
