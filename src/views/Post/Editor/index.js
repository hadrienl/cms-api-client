import React from 'react';

import { Control } from '../PostForm';
import keyShortcuts from './keyShortcuts';
import render from './render';

import './styles.css';

export class Editor extends React.Component {
  static defaultProps = {
    render,
  };

  textareaRef = React.createRef();

  insertImage = ({ alt = '', src, filename, position }) => {
    const { control: { value: content, onChange } } = this.props;
    // TODO use position to find the right markup
    console.log('TODO', {position})
    const newContent = content.replace(`![${alt}]()`, `![${alt || filename}](${src})`);
    onChange({ target: { value: newContent } });
  }

  onKeyDown = e => {
    const { ctrlKey, metaKey, shiftKey, key } = e;
    const { control: { value: content, onChange } } = this.props;
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
    const { render: Render, control } = this.props;
    const { insertImage, onKeyDown, textareaRef } = this;
    const { valid, pristine, touched, changeValue, ...domProps } = control;
    const props = {
      domProps,
      insertImage,
      onKeyDown,
      textareaRef,
    };

    return <Render {...props} />;
  }
}

export default ({ value, ...props}) => (
  <Control
    name="content"
    value={value}
    validators={{
      required: true,
    }}
    component={controlProps => (
      <Editor
        control={controlProps}
        {...props}
      />
    )}
  />
);
