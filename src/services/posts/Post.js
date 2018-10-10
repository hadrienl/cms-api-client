import React from 'react';
import PropTypes from 'prop-types';

import { getPostBy } from './index';

const CACHE = new Map();

export class Post extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  };

  state = {
    post: this.props.id
      ? CACHE.get(this.props.id)
      : undefined,
    postIsLoading: false,
    postHasError: false,
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
      postIsLoading: true,
      postHasError: false,
    });

    let post;
    try {
      post = await getPostBy({ id });
    } catch (e) {
      if (this.isCancelled) return;
      this.setState({
        postHasError: e,
      });
      return;
    }

    CACHE.set(id, post);

    if (this.isCancelled) return;

    this.setState({
      post,
      postIsLoading: false,
    });
  }

  render() {
    const { children } = this.props;
    const { post, postIsLoading } = this.state;
    return children({ post, postIsLoading });
  }
};

export default Post;
