import React, { useEffect, useState } from 'react';

import { useAuth } from '../Context/AuthContext';
import { useData } from '../Context/DataContext';

import {
  togglePlaylist,
  createPlaylistName,
  getPlaylist,
} from '../utils/ApiCall';
import './Modal.css';
import CloseIcon from '@mui/icons-material/Close';
export const Modal = ({ modal, toggleModal, videoId }) => {
  if (modal) {
    document.body.classList.add('active__modal');
  } else {
    document.body.classList.remove('active__modal');
  }
  const [playlistInput, setPlaylistInput] = useState('');
  const { dispatch, playlist, videoList } = useData();
  const { token, userId } = useAuth();

  useEffect(() => {
    if (token) {
      getPlaylist({ token, dispatch, userId });
    }
  }, [token, dispatch, userId]);

  const getVideoDetails = videoList?.find(
    (video) => video?.videoId === videoId
  );
  const { _id: vId } = getVideoDetails;

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
              {playlist?.length > 0 ? (
                playlist?.map((el, i) => (
                  <li
                    key={i}
                    style={{
                      listStyle: 'none',
                    }}
                  >
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
                      value=''
                      style={{ cursor: 'pointer' }}
                    />{' '}
                    <label htmlFor='cb' style={{ fontSize: '1.2rem' }}>
                      {el?.name}
                    </label>
                  </li>
                ))
              ) : (
                <div className='modal__empty__text'>
                  There is no playlist here.
                </div>
              )}
            </ul>

            <form
              onSubmit={(e) => createPlaylist(e)}
              style={{ display: 'flex', gap: '1rem', padding: '10px 5px' }}
            >
              <input
                type='text'
                value={playlistInput}
                placeholder='Enter playlist name'
                onChange={(e) => setPlaylistInput(e.target.value)}
                style={{ padding: '0.2rem', border: '2px solid black' }}
              />
              <button id='login__btn__outlined'>Create</button>
            </form>
            <CloseIcon className='close__modal' onClick={toggleModal} />
          </div>
        </div>
      )}
    </>
  );
};
