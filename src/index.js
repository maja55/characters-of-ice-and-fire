import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss';
import App from './App';

// trying out experimental Concurrent Mode (https://reactjs.org/docs/concurrent-mode-intro.html)
ReactDOM.unstable_createRoot(
  document.getElementById('root')
).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
