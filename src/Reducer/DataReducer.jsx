export const DataReducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_VIDEOS':
      return { ...state, videoList: payload };
    case 'GET_HISTORY':
      return { ...state, history: payload };
    case 'ADD_TO_HISTORY':
      return { ...state, history: payload };
    case 'DELETE_FROM_HISTORY':
      return { ...state, history: payload };
    case 'GET_WATCHLATER':
      return { ...state, watchLater: payload };
    case 'ADD_TO_WATCHLATER':
      return { ...state, watchLater: payload };
    case 'DELETE_FROM_WATCHLATER':
      return { ...state, watchLater: payload };
    case 'ADD_TO_LIKEDVIDEO':
      return true;
    case 'ADD_TO_PLAYLIST':
      return true;
    case 'REMOVE_FROM_LIKEDVIDEOS':
      return true;
    case 'REMOVE_FROM_PLAYLIST':
      return true;
    default:
  }
};
