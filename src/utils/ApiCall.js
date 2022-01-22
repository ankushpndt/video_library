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

export const getLikedVideos = async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/likedvideo`);
    dispatch({ type: 'GET_LIKEDVIDEOS', payload: response.data.likedVideos });
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
    dispatch({
      type: 'ADD_TO_LIKEDVIDEOS',
      payload: response.data.likedVideos,
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
    dispatch({
      type: 'DELETE_FROM_LIKEDVIDEOS',
      payload: response.data.likedVideos,
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
export const getPlaylist = async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/playlist`);
    dispatch({ type: 'GET_VIDEO', payload: response.data.videoList });
  } catch (err) {
    console.log(err);
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