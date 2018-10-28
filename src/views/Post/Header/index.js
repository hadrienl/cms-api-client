import React from 'react';

import render from './render';

export class Header extends React.Component {
  static defaultProps = {
    render,
  };

  inputEl = React.createRef();

  componentDidMount () {
    setTimeout(() => this.focus(), 200);
  }

  focus() {
    const { title } = this.props;
    if (!title && this.inputEl.current) {
      this.inputEl.current.focus();
    }
  }

  render () {
    const { render: Render, ...nextProps } = this.props;
    const { inputEl } = this;
    const props = {
      ...nextProps,
      inputEl,
    };

    return <Render {...props} />;
  }
}

export default Header;
