import React, { useEffect } from 'react';
import { useData } from '../../Context/DataContext';
import '../../Videos.css';
import { getPlaylist } from '../../utils/ApiCall';
import { useAuth } from '../../Context/AuthContext';
import './Playlist.css';
import { PlaylistOverview } from './PlaylistOverview';

export const Playlist = () => {
  const { dispatch, playlist } = useData();
  const { token, userId } = useAuth();
  useEffect(() => {
    getPlaylist({ dispatch, token, userId });
  }, [dispatch, token, userId]);

  return (
    <main className='playlist__container'>
      <h1>Playlist</h1>
      <div className='video__item'>
        {playlist?.map((playlistItem, i) => (
          <div className='container' key={i}>
            <PlaylistOverview playlistItem={playlistItem} />
          </div>
        ))}
      </div>
    </main>
  );
};
