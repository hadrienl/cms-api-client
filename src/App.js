import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Main from './views/Main';
import { State } from './services/State';

import './App.css';

export const App = () => (
  <BrowserRouter>
    <State>
      <Main />
    </State>
  </BrowserRouter>
);

export default App;
