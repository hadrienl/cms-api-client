import React from 'react';

import Control from '../Control';

export class Group extends React.Component {
  state = {
    setState: state => this.setState(state),
  };

  render () {
    const { controls } = this.props;

    return (
      <fieldset>{controls.map((control, k) =>
        <Control
          key={k}
          control={control}
          groupState={this.state} />
      )}</fieldset>
    );
  }
}

export default Group