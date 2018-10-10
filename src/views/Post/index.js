import React from 'react';
import { withRouter } from 'react-router';

import { withState } from '../../services/State';
import { savePost } from '../../services/posts';
import Post from '../../services/posts/Post';
import KeyShortcuts from '../../components/KeyShortcuts';
import PostForm from './PostForm';
import render from './render';

const NEW_ID_LABEL = 'new';

export class PostView extends React.Component {
  static defaultProps = {
    render,
    post: {},
  };

  state = {
    saving: false,
  };

  save = async () => {
    const {
      location: { pathname },
      history: { replace },
      form,
      post,
    } = this.props;

    this.setState({ saving: true });

    const postId = await savePost({
      ...post,
      ...form.values(),
    });

    this.setState({ saving: false });

    if (post.id !== postId) {
      replace(pathname.replace(NEW_ID_LABEL, postId));
    }
  }

  shortcuts = [{
    meta: true,
    key: 's',
    callback: this.save,
    preventDefault: true,
  }, {
    ctrl: true,
    key: 's',
    callback: this.save,
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
  <PostForm>
    {postFormProps => (
      <Post
        id={id !== NEW_ID_LABEL ? id : null}>
        {({ post, loading, error }) =>
          <PostView
            {...props}
            post={post}
            postIsLoading={loading}
            postHasError={error}
            form={postFormProps} />
        }
      </Post>
    )}
  </PostForm>
)));
