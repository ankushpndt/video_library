import React, { useState, useRef } from 'react';
import { PlaylistVideoCard } from './PlaylistVideoCard';
import { renamePlaylist, deletePlaylist } from '../../utils/ApiCall';
import { useAuth } from '../../Context/AuthContext';
import { useData } from '../../Context/DataContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import './Playlist.css';
export const PlaylistOverview = ({ playlistItem }) => {
  const { dispatch } = useData();
  const { token } = useAuth();
  const [name, setName] = useState(playlistItem?.name);
  const playlistIp = useRef(null);

  return (
    <div>
      <div className='playlist__ov'>
        <div className='playlist__ov__ip'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              maxWidth: '5rem',
              padding: '0.5rem',
              fontSize: '1rem',
            }}
            id='pInput'
            ref={playlistIp}
          />
          <button
            className='playlist__transparent__btn'
            onClick={() => playlistIp?.current?.focus()}
          >
            <EditIcon />
          </button>
        </div>
        <div className='playlist__ov__btn'>
          <button
            className='playlist__transparent__btn'
            onClick={() =>
              renamePlaylist({
                dispatch,
                token,
                playlistId: playlistItem._id,
                newName: name,
              })
            }
          >
            <SaveIcon />
          </button>

          <button
            className='playlist__transparent__btn'
            onClick={() =>
              deletePlaylist({
                dispatch,
                token,
                playlistId: playlistItem?._id,
              })
            }
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
      {playlistItem?.videos?.length > 0 ? (
        <div className='playlist__video__card'>
          {playlistItem?.videos.map((video) => (
            <PlaylistVideoCard
              key={video}
              videoId={video}
              playlistId={playlistItem?._id}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            padding: '1rem 0 2rem 0',
            color: 'gray',
          }}
        >
          This playlist is empty
        </div>
      )}
    </div>
  );
};
