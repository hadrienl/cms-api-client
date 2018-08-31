import React from 'react';
import PropTypes from 'prop-types';

import render from './render';

export class Layout extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
  };

  static defaultProps = {
    render,
  };

  render() {
    const { render: Render, ...nextProps } = this.props;
    const props = {
      ...nextProps,
    };

    return <Render {...props} />;
  }
};

export default Layout;
