import React from 'react';

import MarkdownViewer from './MarkdownViewer';

export const EditorRender = ({ input, onKeyDown, insertImage, textareaRef }) => (
<div
  className="editor">
  <textarea
    {...input}
    className="editor__input"
    ref={textareaRef}
    onKeyDown={onKeyDown} />
  <MarkdownViewer
    value={input.value}
    insertImage={insertImage} />
</div>
);

export default EditorRender;
