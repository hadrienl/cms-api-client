import React from 'react';
import { NavLink } from 'react-router-dom';

export const MainNavRender = props => (
  <nav>
    <ul>
      <li>
        <NavLink
          to="/">
          CMS-API-CLIENT
          <br />
          Insérer un logo cool
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/posts">
          Posts list
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/files">
          Files
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/settings">
          Settings
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/logout">
          Logout
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default MainNavRender;
