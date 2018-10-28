import React from 'react';

import Group from './Group';

export class CustomForm extends React.Component {
  render () {
    const { controls } = this.props;

    return <Group controls={controls} />;
  }
}

export default CustomForm;