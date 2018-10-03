import React from 'react';
import ReactMarkdown from 'react-markdown';

import './styles.css';

export const Editor = ({ content, onChange }) => (
  <div
    className="editor">
    <textarea
      className="editor__input"
      value={content}
      onChange={v => onChange(v)} />
    <ReactMarkdown
      className="editor__viewer"
      source={content} />
  </div>
);

export default Editor;
