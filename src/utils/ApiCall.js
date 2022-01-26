import axios from 'axios';

const API_URL = 'https://videoLibraryBackend.ankushpndt.repl.co';
export const getVideos = async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/video`);
    dispatch({ type: 'GET_VIDEOS', payload: response.data.videoList });
  } catch (err) {
    console.log(err);
  }
};

export const getLikedVideos = async (dispatch, token) => {
  try {
    const response = await axios.get(`${API_URL}/likedvideo`, {
      headers: { 'auth-token': token },
    });
    dispatch({
      type: 'GET_LIKEDVIDEOS',
      payload: response.data.likedVideos,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
export const addToLikedVideos = async ({ dispatch, token, _id }) => {
  try {
    const response = await axios.post(
      `${API_URL}/likedvideo/${_id}`,
      {},
      { headers: { 'auth-token': token } }
    );
    console.log(response);
    dispatch({
      type: 'ADD_TO_LIKEDVIDEOS',
      payload: response.data.updatedLikedVideos,
    });
  } catch (err) {
    console.log(err);
  }
};
export const deleteFromLikedVideos = async ({ dispatch, token, _id }) => {
  try {
    const response = await axios.deleteFrom(
      `${API_URL}/likedvideo/${_id}`,

      { headers: { 'auth-token': token } }
    );
    console.log(response);
    dispatch({
      type: 'DELETE_FROM_LIKEDVIDEOS',
      payload: response.data.updatedLikedVideos,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getWatchLater = async (dispatch, token) => {
  try {
    const response = await axios.get(`${API_URL}/watchlater`, {
      headers: { 'auth-token': token },
    });
    dispatch({ type: 'GET_WATCHLATER', payload: response.data.watchLater });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
export const addToWatchLater = async ({ dispatch, token, _id }) => {
  try {
    const response = await axios.post(
      `${API_URL}/watchlater/${_id}`,
      {},
      { headers: { 'auth-token': token } }
    );
    console.log(response);
    dispatch({
      type: 'ADD_TO_WATCHLATER',
      payload: response.data.updatedWatchLater,
    });
  } catch (err) {
    console.log(err.response);
  }
};
export const deleteFromWatchLater = async ({ dispatch, token, _id }) => {
  try {
    const response = await axios.delete(
      `${API_URL}/watchlater/${_id}`,

      { headers: { 'auth-token': token } }
    );
    console.log(response);
    dispatch({
      type: 'DELETE_FROM_WATCHLATER',
      payload: response.data.watchLater,
    });
  } catch (err) {
    console.log(err.response);
  }
};
export const getPlaylist = async ({ dispatch, token, userId }) => {
  try {
    const response = await axios.get(`${API_URL}/playlist/${userId}`, {
      headers: { 'auth-token': token },
    });
    console.log(response);
    dispatch({ type: 'GET_PLAYLIST', payload: response.data.playlists });
  } catch (err) {
    console.log(err);
  }
};
export const createPlaylistName = async ({
  dispatch,
  token,
  userId,
  playlistInput,
  vId,
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/playlist`,
      { owner: userId, name: playlistInput, videos: vId },
      { headers: { 'auth-token': token } }
    );
    dispatch({ type: 'CREATE_PLAYLIST', payload: response.data.playlist });
    console.log(response);
  } catch (err) {
    console.log(err.response);
  }
};
export const togglePlaylist = async ({ dispatch, token, playlistId, vId }) => {
  console.log(vId);
  console.log(playlistId);
  try {
    const response = await axios.post(
      `${API_URL}/playlist/toggle/${playlistId}`,
      {
        videoId: vId,
      },
      {
        headers: { 'auth-token': token },
      }
    );
    console.log(response);
    dispatch({
      type: 'TOGGLE_PLAYLIST',
      payload: { data: response.data.updatedPlaylist, videoId: vId },
    });
  } catch (err) {
    console.log(err);
  }
};
export const deletePlaylist = async (dispatch, token, playlistId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/playlist/delete/${playlistId}`,
      {
        headers: { 'auth-token': token },
      }
    );
    dispatch({ type: 'DELETE_PLAYLIST', payload: response.data.playlist });
  } catch (err) {
    console.log(err);
  }
};
export const renamePlaylist = async (dispatch, playlistId, newName, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/playlist/update/${playlistId}`,
      {
        name: newName,
      },
      {
        headers: { 'auth-token': token },
      }
    );
    dispatch({ type: 'RENAME_PLAYLIST', payload: response.data.playlist });
  } catch (err) {
    console.log(err.response);
  }
};
export const getHistory = async (dispatch, token) => {
  try {
    const response = await axios.get(`${API_URL}/history`, {
      headers: { 'auth-token': token },
    });
    dispatch({ type: 'GET_HISTORY', payload: response.data.history });
    // console.log(response);
  } catch (err) {
    console.log(err.response);
  }
};
export const addToHistory = async ({ dispatch, _id, token }) => {
  try {
    const response = await axios.post(
      `${API_URL}/history/${_id}`,
      {},
      {
        headers: { 'auth-token': token },
      }
    );
    dispatch({ type: 'ADD_TO_HISTORY', payload: response.data.updatedHistory });
    // console.log(response);
  } catch (err) {
    console.log(err.response);
  }
};
export const deleteFromHistory = async ({ dispatch, _id, token }) => {
  try {
    const response = await axios.delete(
      `${API_URL}/history/${_id}`,

      {
        headers: { 'auth-token': token },
      }
    );
    // console.log(response);
    dispatch({
      type: 'DELETE_FROM_HISTORY',
      payload: response.data.history,
    });
  } catch (err) {
    console.log(err.response);
  }
};
