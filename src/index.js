import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

import reportWebVitals from './reportWebVitals';
import { render } from '@testing-library/react';
//import Average from './study'
//const new_element = <Average></Average>

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

//reportWebVitals();