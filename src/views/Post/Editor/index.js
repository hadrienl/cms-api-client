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
  markdownViewerRef = React.createRef();
  
  componentDidMount() {
    try {
      this.textareaRef.current.addEventListener('mousewheel', this.textareaListener = e => this.onScroll(e, this.textareaRef));
      this.markdownViewerRef.current.addEventListener('mousewheel', this.markdownViewerListener = e => this.onScroll(e, this.markdownViewerRef));
    } catch (e) {}
  }

  componentWillUnount() {
    this.textareaRef.current.removeEventListener('mousewheel', this.textareaListener);
    this.markdownViewerRef.current.removeEventListener('mousewheel', this.markdownViewerListener);
  }

  onScroll = ({ target }, ref) => {
    const elToSync = ref === this.textareaRef
      ? this.markdownViewerRef
      : this.textareaRef;

    const height = ref.current.scrollHeight;
    const { scrollTop } = ref.current;
    const percent = scrollTop / height;

    const toSyncHeight = elToSync.current.scrollHeight;
    const top = toSyncHeight * percent;

    elToSync.current.scroll({ top });
  }

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
    const { insertImage, onKeyDown, textareaRef, markdownViewerRef } = this;
    const props = {
      input,
      meta,
      insertImage,
      onKeyDown,
      textareaRef,
      markdownViewerRef,
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
