import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const WatchLaterContext = createContext();

const WatchLaterProvider = ({ children }) => {
  return (
    <WatchLaterContext.Provider value={{}}>
      {children}
    </WatchLaterContext.Provider>
  );
};
export const useWatchLater = () => useContext(WatchLaterContext);
