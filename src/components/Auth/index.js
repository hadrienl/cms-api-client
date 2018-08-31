import React from 'react';

import { firebase } from '../../services/Firebase';
import Loading from '../Loading';
import Form from './Form';

export class Auth extends React.Component {
  state = {
    connected: null,
  };

  componentDidMount() {
    this.authListener = firebase.auth().onAuthStateChanged(user => {
      this.setState({ connected: !!user });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  login = async ({ email, password }) => {
    this.setState({ error: null });

    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      this.setState({ connected: true });
    } catch (e) {
      this.setState({ error: e.code });
    }
  };

  render() {
    const { children } = this.props;
    const { connected, error } = this.state;
    const { login } = this;

    if (connected === null) {
      return <Loading />;
    }

    return connected
    ? children
    : <Form
        error={error}
        onSubmit={login} />;
  }
};

export default Auth;
