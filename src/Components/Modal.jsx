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
  console.log('videoId from db', vId);
  const createPlaylist = (e) => {
    e.preventDefault();
    setPlaylistInput('');
    createPlaylistName({ dispatch, token, vId, userId, playlistInput });
    setPlaylistInput(playlistInput);
  };

  const checkFunc = ({ playlistId }) => {
    const getPlaylistById = playlist?.filter((el) => el?._id === playlistId);

    return getPlaylistById[0]?.videos?.find((videoItem) => {
      return videoItem === vId;
    });
  };

  return (
    <>
      {modal && (
        <div>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal__content'>
            <ul>
              {playlist?.map((el, i) => (
                <li key={i} style={{ listStyle: 'none' }}>
                  <input
                    type='checkbox'
                    id='cb'
                    checked={checkFunc({ playlistId: el?._id })}
                    onChange={() =>
                      togglePlaylist({
                        dispatch,
                        token,
                        playlistId: el?._id,
                        vId,
                      })
                    }
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
