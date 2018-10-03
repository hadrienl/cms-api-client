import React from 'react';

import { withState } from '../../services/State';
import { getPosts } from '../../services/posts';
import render from './render';

export class PostsList extends React.Component {
  static defaultProps = {
    render,
  };

  state = {
    page: 1,
  };

  componentDidMount() {
    this.loadPosts();
  }

  async loadPosts() {
    const { state: { setState } } = this.props;
    const { page } = this.state;
    const posts = await getPosts({ page, perPage: 10 });

    setState({ posts: { list: posts }});
  }

  render() {
    const { render: Render, state: { posts: { list = [] } = {} }, ...nextProps } = this.props;
    console.log({list})
    const props = {
      ...nextProps,
      list,
    };

    return <Render {...props} />;
  }
};

export default withState(PostsList);
