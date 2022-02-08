import React from 'react';
import { useData } from '../../Context/DataContext';
import { Link } from 'react-router-dom';
import '../../Videos.css';
import { v4 as uuidv4 } from 'uuid';
import { togglePlaylist } from '../../utils/ApiCall';
import { useAuth } from '../../Context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import './Playlist.css';
export const PlaylistVideoCard = ({ videoId, playlistId }) => {
  const { videoList, dispatch } = useData();

  const { token } = useAuth();
  const videosFromPlaylist = videoList?.find((video) => videoId === video?._id);

  return (
    <div className='playlist__video__item'>
      <ul className='playlist__video__list'>
        <div className='playlist' key={uuidv4()}>
          <button
            className='playlist__remove__btn'
            onClick={() =>
              togglePlaylist({
                dispatch,
                token,
                playlistId,
                vId: videoId,
              })
            }
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
            to={`/video/${videosFromPlaylist?.videoId}`}
          >
            {' '}
            <div className='playlist__video__body'>
              <img src={videosFromPlaylist?.image} alt='error' />

              <div style={{ marginTop: '1rem' }}>
                {videosFromPlaylist?.title}
                <p>
                  {videosFromPlaylist?.views} •{' '}
                  <span>{videosFromPlaylist?.date}</span>
                </p>
              </div>
            </div>
          </Link>
        </div>
      </ul>
    </div>
  );
};
