import React from 'react';
import { usePlaylist } from './playlistContext';
import { Link } from 'react-router-dom';
import './Videos.css';
export default function LikedVideos() {
  const { likedVideos, playlistDispatch } = usePlaylist();
  return (
    <main>
      <h1>Liked Videos</h1>
      <div className='video__item'>
        <ul>
          {likedVideos.map((video, i) => {
            return (
              <div className='container' key={i}>
                <button
                  className='remove__btn'
                  onClick={() =>
                    playlistDispatch({
                      type: 'REMOVE_FROM_LIKEDVIDEOS',
                      payload: { video },
                    })
                  }
                >
                  <i class='fas fa-trash'></i>
                </button>

                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    display: 'grid',
                    marginBottom: '1rem',
                  }}
                  to={`/video/${video.id}`}
                  key={video.id}
                >
                  {' '}
                  <div className='video__body'>
                    <img
                      src={video.image}
                      width='370'
                      height=' auto'
                      alt='error'
                    />
                    <div style={{ marginTop: '1rem' }}>{video.title}</div>
                    <p>
                      {video.views} • <span>{video.date}</span>
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
