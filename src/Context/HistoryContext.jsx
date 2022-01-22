import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  return (
    <HistoryContext.Provider value={{}}>{children}</HistoryContext.Provider>
  );
};
export const useHistory = () => useContext(HistoryContext);
