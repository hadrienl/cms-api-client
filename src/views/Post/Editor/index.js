import React from 'react';

import keyShortcuts from './KeyShortcuts';
import render from './render';

import './styles.css';

export class Editor extends React.Component {
  static defaultProps = {
    render,
  };

  textareaRef = React.createRef();

  insertImage = ({ alt = '', src, filename, position }) => {
    const { content, onChange } = this.props;
    // TODO use position to find the right markup
    const newContent = content.replace(`![${alt}]()`, `![${alt || filename}](${src})`);
    onChange({ target: { value: newContent } });
  }

  onKeyDown = e => {
    const { ctrlKey, metaKey, shiftKey, key } = e;
    const { content, onChange } = this.props;
    const { textareaRef: { current: textarea } } = this;
    const { selectionStart } = textarea;
    const newContent = keyShortcuts({ ctrlKey, metaKey, shiftKey, key, content, selectionStart })
    if (newContent) {
      e.preventDefault();
      const { content, carret } = newContent;
      onChange({ target: { value: content } });
      setTimeout(() => {
        const range = selectionStart + carret;
        this.textareaRef.current.setSelectionRange(range, range);
      });
    }
  };

  render() {
    const { render: Render, content, onChange } = this.props;
    const { insertImage, onKeyDown, textareaRef } = this;
    const props = {
      content,
      onChange,
      insertImage,
      onKeyDown,
      textareaRef,
    };

    return <Render {...props} />;
  }
}

export default Editor;
