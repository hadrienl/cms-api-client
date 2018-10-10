import React from 'react';

import render from './render';

export class Details extends React.Component {
  static defaultProps = {
    render,
  };

  state = {
    isEvent: !!this.props.eventFrom,
  };

  toggleIsEvent = () => {
    const isEvent = !this.state.isEvent;
    /*const { set } = this.props;
    const isEvent = !this.state.isEvent;
    if (!isEvent) {
      set('eventFrom')(null);
      set('eventTo')(null);
    }*/
    this.setState({ isEvent });
  }

  render() {
    const { render: Render, ...nextProps } = this.props;
    const { isEvent } = this.state;
    const { toggleIsEvent } = this;
    const props = {
      ...nextProps,
      isEvent,
      toggleIsEvent,
    };

    return <Render {...props} />;
  }
};

export default Details;
