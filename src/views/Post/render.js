import React from 'react';

import Drawer from '../../layouts/Drawer';
import Header from './Header';
import Editor from './Editor';
import Details from './Details';
import './styles.css';

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
    {({ toggleDrawer }) => (
      <React.Fragment>
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
      </React.Fragment>
    )}
  </Drawer>
);

export default PostRender;
