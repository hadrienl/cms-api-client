import React from 'react';
import PropTypes from 'prop-types';

import render from './render';

export class Form extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    error: PropTypes.string,
  };

  static defaultProps = {
    render,
    onSubmit() {},
  };

  setEmail = ({ target: { value: email } }) => this.setState({ email });
  setPassword = ({ target: { value: password } }) => this.setState({ password });
  submit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { email, password } = this.state;
    onSubmit({ email, password });
  };

  render() {
    const { render: Render, ...nextProps } = this.props;
    const { setEmail, setPassword, submit } = this;
    const props = {
      ...nextProps,
      setEmail,
      setPassword,
      submit,
    };

    return <Render {...props} />;
  }
};

export default Form;
