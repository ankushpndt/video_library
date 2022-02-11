import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './Context/DataContext';
import { AuthProvider } from './Context/AuthContext';
import {
  transitions,
  positions,
  Provider as AlertProvider,
  types,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
const rootElement = document.getElementById('root');
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  type: types.ERROR,
};
ReactDOM.render(
  <StrictMode>
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <AuthProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </AuthProvider>
      </AlertProvider>
    </Router>
  </StrictMode>,
  rootElement
);
