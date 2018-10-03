import React from 'react';

const context = React.createContext();

export class State extends React.Component {
  state = {
    setState: state => {
      this.setState(
        typeof state === 'function'
        ? state(this.state)
        : state
      );
    },
  };

  render() {
    const { children } = this.props;

    return (
      <context.Provider
        value={this.state}>
        {children}
      </context.Provider>
    );
  }
}

export const withState = WrappedComponent =>
class WithState extends React.Component {
  render() {
    return (
      <context.Consumer>
      {value => <WrappedComponent state={value} {...this.props} />}
      </context.Consumer>
    );
  }
}
