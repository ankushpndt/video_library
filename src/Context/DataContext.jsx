import { createContext, useContext, useReducer } from 'react';
import { DataReducer } from '../Reducer/DataReducer';
const DataContext = createContext();
const initialState = {
  watchLater: [],
  likedVideo: [],
  history: [],
  playlist: [],
  videoList: [],
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  return (
    <DataContext.Provider
      value={{
        dispatch,
        watchLater: state?.watchLater,
        likedVideo: state?.likedVideo,
        playlist: state?.playlist,
        history: state?.history,
        videoList: state?.videoList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
