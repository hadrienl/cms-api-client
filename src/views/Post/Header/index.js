import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = ({ toggleDetail, title = '', set, save }) => (
  <nav>
    <NavLink
      to="/posts"
      className="button">
      Retour
    </NavLink>
    <input
      value={title}
      onChange={set('title')} />
    <button
      className="button"
      type="submit"
      onClick={save}>
      Sauvegarder
    </button>
    <button
      className="button"
      type="button"
      onClick={toggleDetail}>
      Détails
    </button>
  </nav>
);

export default Header;
