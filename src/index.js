import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import PlaylistProvider from './playlistContext';
import { AuthProvider } from './Context/AuthContext';
const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <PlaylistProvider>
          <App />
        </PlaylistProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
