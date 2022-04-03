import React, { useEffect } from 'react';
import { useData } from '../../Context/DataContext';
import '../../Videos.css';
import { getPlaylist } from '../../utils/ApiCall';
import { useAuth } from '../../Context/AuthContext';
import './Playlist.css';
import { PlaylistOverview } from './PlaylistOverview';
import { Loader } from '../../Components/Loader';
export const Playlist = () => {
  const { dispatch, playlist,setLoader,loader } = useData();
  const { token, userId } = useAuth();
  useEffect(() => {
    getPlaylist({ dispatch, token, userId,setLoader });
  }, [dispatch, token, userId,setLoader]);

  return (
    <main className='playlist__container'>
      <h1>Playlist</h1>
      {!loader?<div className='video__item'>
        {playlist.length > 0 ? (
          playlist?.map((playlistItem, i) => (
            <div className='container' key={i}>
              <PlaylistOverview playlistItem={playlistItem} />
            </div>
          ))
        ) : (
          <div className='empty__text'>There is no playlist here.</div>
        )}
      </div>:<Loader/>}
    </main>
  );
};
