import React from 'react';

import Theme from '../../components/Theme';
import render from './render';

export class Main extends React.Component {
  static defaultProps = {
    render,
  };

  render() {
    const { render: Render, ...nextProps } = this.props;
    const props = {
      ...nextProps,
    };

    return (
      <Theme>
        <Render {...props} />
      </Theme>
    );
  }
};

export default Main;
