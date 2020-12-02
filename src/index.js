import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// Uncomment to measure performance. https://bit.ly/CRA-vitals
// import reportWebVitals from './utils/reportWebVitals';
// reportWebVitals(console.log);
