import React from 'react';

import Header from './Header';
import Editor from './Editor';
import Details from './Details';
import './styles.css';

export const PostRender = ({ content, set, displayDetails, ...props }) => (
  <div
    className="post">
    <div
      className="post__header">
      <Header
        {...props}
        set={set} />
    </div>
    <div
      className="post__edit">
      <Editor
        content={content}
        onChange={set('content')} />
    </div>
    <div
      className={`post__details ${displayDetails ? '' : 'hidden'}`}>
      <Details
        className={displayDetails ? '' : 'hidden'}
        {...props}
        set={set} />
    </div>
  </div>
);

export default PostRender;
