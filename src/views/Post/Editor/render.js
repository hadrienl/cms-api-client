import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

import Image from './Image';
import Link from './Link';

export const EditorRender = ({ input, onKeyDown, insertImage, textareaRef }) => (
<div
  className="editor">
  <textarea
    {...input}
    className="editor__input"
    ref={textareaRef}
    onKeyDown={onKeyDown} />
  <ReactMarkdown
    className="editor__viewer"
    source={input.value}
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
    }} />
</div>
);

export default EditorRender;
