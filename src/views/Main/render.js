import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router';

import Header from './Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

import Auth from '../../components/Auth';
import Layout from './Layout';
import MainNav from './MainNav';

const Post = lazy(() => import('../Post'));
const Home = lazy(() => import('../Home'));
const PostsList = lazy(() => import('../PostsList'));
const Files = lazy(() => import('../Files'));
const Settings = lazy(() => import('../Settings'));

export const MainRender = ({ homeRoute, routes }) => (
  <div
    className="App">
    <Auth>
      <Switch>
        <Route
          path="/posts/:id">
          <Suspense fallback={<Loading />}><Post /></Suspense>
        </Route>
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
                    exact>
                    <Suspense fallback={<Loading />}><Home /></Suspense>
                  </Route>
                  <Route
                    path="/posts">
                    <Suspense fallback={<Loading />}><PostsList /></Suspense>
                  </Route>
                  <Route
                    path="/files">
                    <Suspense fallback={<Loading />}><Files /></Suspense>
                  </Route>
                  <Route
                    path="/settings">
                    <Suspense fallback={<Loading />}><Settings /></Suspense>
                  </Route>
                </Switch>
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
