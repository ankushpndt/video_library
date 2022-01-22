import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  return (
    <PlaylistContext.Provider value={{}}>{children}</PlaylistContext.Provider>
  );
};
export const usePlaylist = () => useContext(PlaylistContext);
