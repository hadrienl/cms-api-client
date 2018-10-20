import React from 'react';
import { Field } from 'react-final-form';
import { NavLink } from 'react-router-dom';
import { InputGroup, Intent } from '@blueprintjs/core';

import SaveButton from './SaveButton';
import './styles.css';

export const Header = ({ toggleDetail, title = '', set, form: { handleSubmit, submitting },...props }) => (
  <nav
    className="post-header">
    <NavLink
      to="/posts"
      className="post-header__action-back button"
      title="Back">
      <i className="fas fa-times-circle"></i>
    </NavLink>
    <Field name="title">{({ input, meta }) => (
      <InputGroup
        {...input}
        intent={(!meta.pristine && !meta.valid) ? Intent.WARNING : null}
        className="post-header__title"
      />
    )}</Field>
    <button
      className="post-header__action-details"
      type="button"
      onClick={toggleDetail}
      title="Details">
      <i className="fas fa-info-circle"></i>
    </button>
    <SaveButton
      className="post-header__action-save"
      label={submitting ? <i className="fas fa-spin fa-spinner"></i> : 'Save'}
      onClick={handleSubmit}
      onSave={handleSubmit}
      onPublish={() => console.log('publish')}
      onDelete={() => console.log('delete')}
    />
  </nav>
);

export default Header;
