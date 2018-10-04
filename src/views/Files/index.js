import React from 'react';

import render from './render';

export class Files extends React.Component {
  static defaultProps = {
    render,
  };

  uploaded = url => {
    console.log({url})
  }

  render() {
    const { render: Render, ...nextProps } = this.props;
    const { uploaded } = this;
    const props = {
      ...nextProps,
      uploaded,
    };

    return <Render {...props} />;
  }
};

export default Files;
