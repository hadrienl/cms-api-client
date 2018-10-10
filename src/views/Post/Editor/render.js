import React from 'react';
import ReactMarkdown from 'react-markdown';

import Image from './Image';
import Link from './Link';

export const EditorRender = ({ domProps, onKeyDown, insertImage, textareaRef }) => (
<div
  className="editor">
  <textarea
    {...domProps}
    className="editor__input"
    ref={textareaRef}
    onKeyDown={onKeyDown} />
  <ReactMarkdown
    className="editor__viewer"
    source={domProps.value}
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
