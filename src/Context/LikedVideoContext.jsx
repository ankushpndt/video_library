import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LikedVideosContext = createContext();

const LikedVideosProvider = ({ children }) => {
  return (
    <LikedVideosContext.Provider value={{}}>
      {children}
    </LikedVideosContext.Provider>
  );
};
export const useLikedVideos = () => useContext(LikedVideosContext);
