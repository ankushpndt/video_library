import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './Context/DataContext';
import { AuthProvider } from './Context/AuthContext';
import PlaylistProvider from './playlistContext';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <DataProvider>
          <PlaylistProvider>
            <App />
          </PlaylistProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
