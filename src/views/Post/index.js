import React from 'react';
import { withRouter } from 'react-router';

import { withState } from '../../services/State';
import Post from '../../services/posts/Post';
import KeyShortcuts from '../../components/KeyShortcuts';
import PostForm from './PostForm';
import render from './render';
import { NEW_ID_LABEL } from './constants';

export class PostView extends React.Component {
  static defaultProps = {
    render,
    post: {},
  };

  shortcuts = [{
    meta: true,
    key: 's',
    callback: this.props.form.handleSubmit,
    preventDefault: true,
  }, {
    ctrl: true,
    key: 's',
    callback: this.props.form.handleSubmit,
    preventDefault: true,
  }];

  render() {
    const { render: Render, ...nextProps } = this.props;
    const { save, shortcuts } = this;

    const props = {
      ...nextProps,
      ...this.state,
      save,
    };

    return (
      <KeyShortcuts
        shortcuts={shortcuts}>
        <Render {...props} />
      </KeyShortcuts>
    );
  }
};

export default withRouter(withState(({ match: { params: { id } }, ...props }) => (
  <Post
    id={id !== NEW_ID_LABEL ? id : null}>{({ post, loading, error }) =>
    <PostForm post={post}>{postFormProps => (
      <PostView
        {...props}
        post={post}
        postIsLoading={loading}
        postHasError={error}
        form={postFormProps} />
    )}</PostForm>
  }</Post>
)));
