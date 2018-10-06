import React from 'react';

import { auth } from '../../services/Firebase';
import Loading from '../Loading';
import Form from './Form';
import { withState } from '../../services/State';

export class Auth extends React.Component {
  state = {
    connected: null,
  };

  componentDidMount() {
    const { state: { setState } } = this.props;
    this.authListener = auth.onAuthStateChanged(user => {
      this.setState({ connected: !!user });
      setState({ connectedUser: user });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  login = async ({ email, password }) => {
    this.setState({ error: null });

    try {
      await auth.signInWithEmailAndPassword(email, password);
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

export default withState(Auth);
