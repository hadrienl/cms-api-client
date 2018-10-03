import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable';

import Header from './Header';
import Footer from './Footer';
import Loading from '../../components/Loading';

import Auth from '../../components/Auth';
import Layout from './Layout';
import MainNav from './MainNav';

export const MainRender = ({ homeRoute, routes }) => (
  <div
    className="App">
    <Auth>
      <Switch>
        <Route
          path="/posts/:id"
          component={Loadable({
            loader: () => import('../Post'),
            loading: Loading,
          })} />
        <Route
          component={() => (
          <React.Fragment>
            <Header />
            <Layout
              columns={[
                <MainNav />,
                <Switch>
                  <Route
                    path="/"
                    exact
                    component={Loadable({
                      loader: () => import('../Home'),
                      loading: Loading,
                    })}/>
                  <Route
                    path="/posts"
                    component={Loadable({
                      loader: () => import('../PostsList'),
                      loading: Loading,
                    })}/>
                </Switch>,
              ]}>
            </Layout>
            <Footer />
          </React.Fragment>
          )} />
      </Switch>
    </Auth>
  </div>
);

export default MainRender;
