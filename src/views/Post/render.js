import React from 'react';

import Drawer from '../../layouts/Drawer';
import Header from './Header';
import Editor from './Editor';
import Details from './Details';
import './styles.css';

export const PostRender = ({ content, set, ...props }) => (
  <Drawer
    className="post"
    drawer={(
      <Details
        className="post__details"
        {...props}
        set={set} />
    )}
    directionFrom="right">
    {({ toggleDrawer }) => (
      <React.Fragment>
        <div
          className="post__header">
          <Header
            {...props}
            set={set}
            toggleDetail={toggleDrawer} />
        </div>
        <div
          className="post__edit">
          <Editor
            content={content}
            onChange={set('content')} />
        </div>
      </React.Fragment>
    )}
  </Drawer>
);

export default PostRender;
