import React from 'react';
import { Form } from 'react-final-form';
import { withRouter } from 'react-router';

import { savePost } from '../../services/posts';
import { NEW_ID_LABEL } from './constants';

export class PostForm extends React.Component {
  submit = async form => {
    const {
      location: { pathname },
      history: { replace },
      post,
    } = this.props;

    const postId = await savePost({
      ...post,
      ...form,
    });

    if (post.id !== postId) {
      replace(pathname.replace(NEW_ID_LABEL, postId));
    }
  }

  validate = form => {
    console.log(form)
    const { title, content } = form;
    const errors = {};

    const titleError = this.validateRequired(title);
    if (titleError) {
      errors.title = titleError;
    }

    const contentError = this.validateRequired(content);
    if (contentError) {
      errors.content = contentError;
    }

    return errors;
  }

  validateRequired(value = '') {
    if (!value.length) {
      return 'required';
    }
  }

  render () {
    const { children, post } = this.props;
    const { submit, validate } = this;

    return (
      <Form
        initialValues={post}
        onSubmit={submit}
        validate={validate}
        render={formProps => children(formProps)}
      />
    )
  }
}

export default withRouter(PostForm);