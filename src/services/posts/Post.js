import React from 'react';
import PropTypes from 'prop-types';

import { getPostBy } from './index';
import { getPost, addPost } from './cache';

export class Post extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  };

  state = {
    post: getPost(this.props.id),
    loading: false,
    error: false,
  };

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.loadPost(id);
    }
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  async loadPost(id) {
    this.setState({
      loading: true,
      error: false,
    });

    let post;
    try {
      post = await getPostBy({ id });
    } catch (e) {
      if (this.isCancelled) return;
      this.setState({
        error: e,
      });
      return;
    }

    addPost(post);

    if (this.isCancelled) return;

    this.setState({
      post,
      loading: false,
    });
  }

  render() {
    const { children } = this.props;
    const { post, loading, error } = this.state;
    return children({ post, loading, error });
  }
};

export default Post;
