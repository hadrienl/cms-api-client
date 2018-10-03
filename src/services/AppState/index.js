import React from 'react';

const context = React.createContext();

const listeners = new Map();

export function setAppState(state) {
  listeners.forEach(component => component.setState(
    typeof state === 'function'
    ? state(component.state)
    : state
  ));
}

export class AppState extends React.Component {
  state = {};

  componentDidMount() {
    listeners.set(this, this);
  }

  componentWillUnmount() {
    listeners.remove(this);
  }

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

export const withAppState = WrappedComponent =>
class WithState extends React.Component {
  render() {
    return (
      <context.Consumer>
      {value => <WrappedComponent state={value} {...this.props} />}
      </context.Consumer>
    );
  }
}
