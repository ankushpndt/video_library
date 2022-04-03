import { createContext, useContext, useReducer,useState } from 'react';
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
  const [loader,setLoader] = useState(false)
  return (
    <DataContext.Provider
      value={{
        dispatch,
        watchLater: state?.watchLater,
        likedVideo: state?.likedVideo,

        playlist: state?.playlist,
        history: state?.history,
        videoList: state?.videoList,
        loader,setLoader
      }}
    >
      {console.log(state)}
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
