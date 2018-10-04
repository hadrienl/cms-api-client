import React from 'react';
import ReactMarkdown from 'react-markdown';

import Image from './Image';

import './styles.css';

export class Editor extends React.Component {
  insertImage = ({ alt = '', src, filename }) => {
    const { content, onChange } = this.props;
    const newContent = content.replace(`![${alt}]()`, `![${alt || filename}](${src})`);
    onChange({ target: { value: newContent } });
  }

  render() {
    const { content, onChange } = this.props;
    const { insertImage } = this;

    return (
      <div
        className="editor">
        <textarea
          className="editor__input"
          value={content}
          onChange={v => onChange(v)} />
        <ReactMarkdown
          className="editor__viewer"
          source={content}
          renderers={{
            image: props => (
              <Image
                {...props}
                onUpload={insertImage} />
            ),
          }} />
      </div>
    );
  }
}

export default Editor;
