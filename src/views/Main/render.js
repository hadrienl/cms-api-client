import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable';

//import Header from './Header';
//import Footer from './Footer';
//import Loading from './Loading';

import Auth from '../../components/Auth';

const Header = () => <p>Header</p>
const Footer = () => <p>Footer</p>
const Loading = () => <p>Wait for it</p>

export const MainRender = ({ homeRoute, routes }) => (
  <div
    className="App">
    <Auth>
      <Switch>
        <Route
          path="/"
          exact
          component={Loadable({
            loader: () => import('../Home'),
            loading: Loading,
          })}/>
      </Switch>
    </Auth>
  </div>
);

export default MainRender;
