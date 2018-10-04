import React from 'react';

import { listFiles } from '../../../services/files';
import render from './render';

export class List extends React.Component {
  static defaultProps = {
    render,
  };

  state = {
    loading: false,
    files: [],
  };

  componentDidMount() {
    this.loadFiles();
  }

  async loadFiles() {
    this.setState({ loading: true });
    const files = await listFiles();
    this.setState({ files, loading: false });
  }

  render() {
    const { render: Render, ...nextProps } = this.props;
    const { files, loading } = this.state;
    const props = {
      ...nextProps,
      loading,
      files,
    };

    return <Render {...props} />;
  }
};

export default List;
