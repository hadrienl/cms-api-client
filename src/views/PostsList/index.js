import React from 'react';

import { withState } from '../../services/State';
import Posts from '../../services/posts/Posts';
import render from './render';

export class PostsList extends React.Component {
  static defaultProps = {
    render,
  };

  state = {
    page: 1,
  };

  displayPage = page => this.setState({ page });

  render() {
    const { render: Render, ...nextProps } = this.props;
    const { page } = this.state;
    const { displayPage } = this;
    const props = {
      ...nextProps,
      displayPage,
    };

    return (
      <Posts
        page={page}>
        {({ posts, loading: postsAreLoading, error: postsHaveError }) => (
          <Render
            {...props}
            posts={posts}
            postsAreLoading={postsAreLoading}
            postsHaveError={postsHaveError} />
        )}
      </Posts>
    );
  }
};

export default withState(PostsList);
