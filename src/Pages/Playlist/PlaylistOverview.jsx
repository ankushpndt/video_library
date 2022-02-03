import React, { useState } from 'react';
import { PlaylistVideoCard } from './PlaylistVideoCard';
import { renamePlaylist, deletePlaylist } from '../../utils/ApiCall';
import { useAuth } from '../../Context/AuthContext';
import { useData } from '../../Context/DataContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Playlist.css';
export const PlaylistOverview = ({ playlistItem }) => {
  const { dispatch, playlist } = useData();
  const { token, userId } = useAuth();
  const [name, setName] = useState(playlistItem?.name);
  return (
    <div>
      <div className='playlist__ov'>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ border: 'none', maxWidth: '5rem' }}
        />
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
            <EditIcon />
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
      <div className='playlist__video__card'>
        {playlistItem?.videos.map((video) => (
          <PlaylistVideoCard
            key={video}
            videoId={video}
            playlistId={playlistItem?._id}
          />
        ))}
      </div>
    </div>
  );
};
