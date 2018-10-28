import React from 'react';

import { context } from '../Theme';
import render from './render';

export class Footer extends React.Component {
  static defaultProps = {
    render,
  };

  static contextType = context;

  switchTheme = () => this.context.switchTheme();

  render() {
    const { render: Render, ...nextProps } = this.props;
    const { theme } = this.context;
    const { switchTheme } = this;
    const props = {
      ...nextProps,
      theme,
      switchTheme,
    };

    return <Render {...props} />;
  }
};

export default Footer;
