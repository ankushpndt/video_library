import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useData } from '../Context/DataContext';

import {
  togglePlaylist,
  createPlaylistName,
  getPlaylist,
} from '../utils/ApiCall';
import './Modal.css';

export const Modal = ({ modal, toggleModal, videoId }) => {
  if (modal) {
    document.body.classList.add('active__modal');
  } else {
    document.body.classList.remove('active__modal');
  }
  const [playlistInput, setPlaylistInput] = useState('');
  const { dispatch, playlist, videoList } = useData();
  const { token, userId } = useAuth();

  let playlistId;

  for (let i of playlist) {
    playlistId = i?._id;
  }

  useEffect(() => {
    getPlaylist({ token, dispatch, userId });
  }, [token, dispatch]);
  const getVideoDetails = videoList?.find(
    (video) => video?.videoId === videoId
  );
  const { _id: vId } = getVideoDetails;
  let extractVideoIdFromPlaylist;
  for (let i of playlist) {
    extractVideoIdFromPlaylist = i.videos.find((el) => el === vId);
  }
  console.log(extractVideoIdFromPlaylist);
  const createPlaylist = (e) => {
    e.preventDefault();
    setPlaylistInput('');
    createPlaylistName({ dispatch, token, vId, userId, playlistInput });
    setPlaylistInput(playlistInput);
  };
  const checkFunc = extractVideoIdFromPlaylist ? true : false;
  console.log(checkFunc);
  const checkboxHandler = () => {
    checkFunc
      ? togglePlaylist({ dispatch, token, playlistId, vId })
      : togglePlaylist({ dispatch, token, playlistId, vId });
  };

  return (
    <>
      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal__content'>
            <ul>
              {playlist?.map((el, i) => (
                <li key={i} style={{ listStyle: 'none' }}>
                  <input
                    type='checkbox'
                    id='cb'
                    checked={checkFunc}
                    onChange={checkboxHandler}
                  />{' '}
                  <label htmlFor='cb'>{el?.name}</label>
                </li>
              ))}
            </ul>

            <form onSubmit={(e) => createPlaylist(e)}>
              <input
                type='text'
                value={playlistInput}
                placeholder='Enter playlist name'
                onChange={(e) => setPlaylistInput(e.target.value)}
              />
              <button>Create</button>
            </form>
            <button className='close__modal' onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};
