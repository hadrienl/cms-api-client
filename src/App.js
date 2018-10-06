import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

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
