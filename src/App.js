import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Main from './views/Main';

import './App.css';

export const App = () => (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);

export default App;
