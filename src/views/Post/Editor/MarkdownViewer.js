import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

import Image from './Image';
import Link from './Link';

class MarkdownHasError extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidUpdate ({ value: prevValue }) {
    const { value } = this.props;
    if (value !== prevValue) {
      this.setState({ hasError: false });
    }
  }

  render() {
    const { children, value } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <p>Une erreur de syntaxe dans le HTML inclus dans votre markdown empêche son affichage</p>
      );
    }

    return children(value);
  }
}

export class MarkdownViewer extends React.Component {
  render () {
    const { value, insertImage } = this.props;

    return (
      <MarkdownHasError value={value}>
        {value => <ReactMarkdown
          className="editor__viewer"
          source={value}
          sourcePos
          escapeHtml={false}
          renderers={{
            image: props => (
              <Image
                {...props}
                onUpload={insertImage} />
            ),
            link: props => (
              <Link
                {...props} />
            )
          }} />}
      </MarkdownHasError>
    );
  }
}

export default MarkdownViewer
