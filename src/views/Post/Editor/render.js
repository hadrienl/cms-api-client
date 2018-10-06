import React from 'react';
import ReactMarkdown from 'react-markdown';

import Image from './Image';
import Link from './Link';

export const EditorRender = ({ content, onChange, onKeyDown, insertImage, textareaRef }) => (
  <div
    className="editor">
    <textarea
      className="editor__input"
      ref={textareaRef}
      value={content}
      onChange={v => onChange(v)}
      onKeyDown={onKeyDown} />
    <ReactMarkdown
      className="editor__viewer"
      source={content}
      sourcePos
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
      }} />
  </div>
);

export default EditorRender;
