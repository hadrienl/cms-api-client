import React from 'react';

import Drawer from '../../layouts/Drawer';
import Header from './Header';
import Footer from '../../components/Footer';
import Editor from './Editor';
import Details from './Details';
import './styles.scss';

export const PostRender = ({ post, post: { content }, ...props }) => (
  <Drawer
    className="post"
    drawer={(
      <Details
        {...post}
        {...props}
        className="post__details" />
    )}
    directionFrom="right">
    {({ toggleDrawer, drawerIsVisible }) => (
      <>
        <form
          onSubmit={props.form.handleSubmit}
          className={`post__form ${drawerIsVisible ? 'post__form--blured' : ''}`}>
          <div
            className="post__header">
            <Header
              {...post}
              {...props}
              toggleDetail={toggleDrawer} />
          </div>
          <div
            className="post__edit">
            <Editor
              value={content} />
          </div>
        </form>
        <Footer className="post__footer">
          Markdown
        </Footer>
      </>
    )}
  </Drawer>
);

export default PostRender;
