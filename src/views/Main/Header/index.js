import React from 'react';

import render from './render';

export class Header extends React.Component {
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

export default Header;
