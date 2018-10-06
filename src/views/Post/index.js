import React from 'react';
import { withRouter } from 'react-router';

import { withState } from '../../services/State';
import { getPostBy, savePost } from '../../services/posts';
import render from './render';

export class Post extends React.Component {
  static defaultProps = {
    render,
  };

  state = {
    loading: true,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    if (id !== 'new') {
      this.loadPost(id);
    }
  }

  async loadPost(id) {
    this.setState({
      loading: true,
    });
    const post = await getPostBy({ id });

    this.setState({
      ...post,
      loading: false,
    });
  }

  set = k => {
    switch (k) {
      case 'publishedAt':
      case 'eventFrom':
      case 'eventTo':
        return date => this.setState({ [k]: date });
      default:
        return ({ target: { value }}) => this.setState({ [k]: value });
    }
  };

  save = async () => {
    const { match: { params: { id } }, location: { pathname }, history: { replace } } = this.props;
    const { loading, displayDetails, ...postData } = this.state;
    const postId = await savePost(postData);

    if (id !== postId) {
      replace(pathname.replace('new', postId));
    }
  }

  render() {
    const { render: Render, ...nextProps } = this.props;
    const { set, save } = this;
    const props = {
      ...nextProps,
      ...this.state,
      set,
      save,
    };

    return <Render {...props} />;
  }
};

export default withRouter(withState(Post));
