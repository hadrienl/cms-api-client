import React from 'react';

export class Local extends React.Component {
  render () {
    const { component: Component, ...props } = this.props;

    return <Component {...props} />;
  }
}

export default Local;