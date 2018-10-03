import React from 'react';
import { withRouter } from 'react-router';

import { withState } from '../../services/State';
import { getPostBy } from '../../services/posts';
import render from './render';

export class Post extends React.Component {
  static defaultProps = {
    render,
  };

  state = {
    loading: true,
    displayDetails: false,
  };

  componentDidMount() {
    const { match: { params: { slug } } } = this.props;
    this.loadPost(slug);
  }

  async loadPost(slug) {
    this.setState({
      loading: true,
    });
    const post = await getPostBy({ slug });

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

  toggleDetail = () => this.setState({ displayDetails: !this.state.displayDetails });

  save = () => {
    console.log('save', this.state);
  }

  render() {
    const { render: Render, ...nextProps } = this.props;
    const { set, toggleDetail, save } = this;
    const props = {
      ...nextProps,
      ...this.state,
      set,
      toggleDetail,
      save,
    };

    return <Render {...props} />;
  }
};

export default withRouter(withState(Post));
