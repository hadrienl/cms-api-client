import React from 'react';
import { NavLink } from 'react-router-dom';
import { InputGroup, Intent } from '@blueprintjs/core';

import { Control } from '../PostForm';
import SaveButton from './SaveButton';
import './styles.css';

export const Header = ({ toggleDetail, title = '', set, save, saving, ...props }) => (
  <nav
    className="post-header">
    <NavLink
      to="/posts"
      className="post-header__action-back button"
      title="Back">
      <i className="fas fa-times-circle"></i>
    </NavLink>
    <Control
      name="title"
      value={title}
      validators={{
        required: true,
      }}
      component={({ valid, pristine, touched, changeValue, ...domProps }) => (
        <InputGroup
          {...domProps}
          intent={(!pristine && !valid) ? Intent.WARNING : null}
          className="post-header__title"
         />
      )}
    />
    <button
      className="post-header__action-details"
      type="button"
      onClick={toggleDetail}
      title="Details">
      <i className="fas fa-info-circle"></i>
    </button>
    <SaveButton
      className="post-header__action-save"
      label={saving ? <i className="fas fa-spin fa-spinner"></i> : 'Save'}
      onClick={save}
      onSave={save}
      onPublish={() => console.log('publish')}
      onDelete={() => console.log('delete')}
    />
  </nav>
);

export default Header;
