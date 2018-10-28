import React from 'react';
import ReactMarkdown from 'react-markdown';

import Image from './Image';
import Link from './Link';

export const EditorRender = ({ input, onKeyDown, insertImage, textareaRef, markdownViewerRef }) => (
<div
  className="editor">
  <textarea
    {...input}
    className="editor__input"
    ref={textareaRef}
    onKeyDown={onKeyDown} />
    <div
      ref={markdownViewerRef}
      className="editor__viewer"
      source={input.value}
    >
      <ReactMarkdown
    
        source={input.value}
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
</div>
);

export default EditorRender;
