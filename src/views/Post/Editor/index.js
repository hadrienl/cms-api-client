import React from 'react';
import { Field } from 'react-final-form';

import keyShortcuts from './keyShortcuts';
import render from './render';

import './styles.scss';

export class Editor extends React.Component {
  static defaultProps = {
    render,
  };

  textareaRef = React.createRef();

  insertImage = ({ alt = '', src, filename, position }) => {
    const { input: { value: content, onChange } } = this.props;
    // TODO use position to find the right markup
    console.log('TODO', {position})
    const newContent = content.replace(`![${alt}]()`, `![${alt || filename}](${src})`);
    onChange({ target: { value: newContent } });
  }

  onKeyDown = e => {
    const { ctrlKey, metaKey, shiftKey, key } = e;
    const { input: { value: content, onChange } } = this.props;
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
    const { render: Render, meta , input } = this.props;
    const { insertImage, onKeyDown, textareaRef } = this;
    const props = {
      input,
      meta,
      insertImage,
      onKeyDown,
      textareaRef,
    };

    return <Render {...props} />;
  }
}

export default ({ value, ...props}) => (
  <Field
    name="content">{({ input, meta }) => (
    <Editor
      input={input}
      meta={meta}
    />
  )}</Field>
);
