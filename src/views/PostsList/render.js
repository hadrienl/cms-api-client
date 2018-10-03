import React from 'react';
import { NavLink } from 'react-router-dom';

export const PostsListRender = ({ list }) => (
  <div>
    <ul>
      {list.map(post => (
        <li
          key={post.id}>
          <NavLink
            to={`/posts/${post.slug}`}>
            {post.title}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export default PostsListRender;
