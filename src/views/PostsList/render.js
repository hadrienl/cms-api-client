import React from 'react';
import { NavLink } from 'react-router-dom';

export const PostsListRender = ({ posts }) => (
  <div>
    <NavLink
      to="/posts/new">
      Nouveau post
    </NavLink>
    <ul>
      {posts.map(post => (
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
