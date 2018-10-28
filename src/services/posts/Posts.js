import React from 'react';
import PropTypes from 'prop-types';

import { getPosts } from './index';
import { addToList, getListPage } from './cache';

export class Posts extends React.Component {
  static propTypes = {
    page: PropTypes.number,
    perPage: PropTypes.number,
  };

  static defaultProps = {
    page: 1,
    perPage: 100,
  };

  state = {
    posts: getListPage(this.props.page, this.props.perPage),
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.loadPosts();
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  async loadPosts() {
    const { page, perPage } = this.props;

    this.setState({
      loading: true,
      error: false,
    });

    let posts;
    try {
      posts = await getPosts({ page, perPage });
    } catch (error) {
      if (this.isCancelled) return;
      this.setState({
        loading: false,
        error,
      });
      return;
    }

    if (this.isCancelled) return;

    addToList(posts, page, perPage);

    this.setState({
      loading: false,
      posts: getListPage(page, perPage),
    });
  }

  render() {
    const { children } = this.props;
    const { posts, loading, error } = this.state;
    return children({
      posts,
      loading,
      error
    });
  }
};

export default Posts;
