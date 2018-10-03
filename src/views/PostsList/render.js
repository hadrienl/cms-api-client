import React from 'react';
import { NavLink } from 'react-router-dom';

export const PostsListRender = ({ list }) => (
  <div>
    <NavLink
      to="/posts/new">
      Nouveau post
    </NavLink>
    <ul>
      {list.map(post => (
        <li
          key={post.id}>
          <NavLink
            to={`/posts/${post.id}`}>
            {post.title}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export default PostsListRender;
