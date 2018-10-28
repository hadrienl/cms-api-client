import React from 'react';

import Upload from '../Upload';
import Viewer from './Viewer';

import './styles.scss';

export class ImageUpload extends React.Component {
  state = {};

  componentDidUpdate ({ initialValue: prevInitialValue}) {
    const { initialValue } = this.props;
    if (initialValue !== prevInitialValue) {
      this.setState({ value: initialValue });
    }
  }

  onUpload = ({ url: value }) => {
    this.setState({ value });
    const { onChange } = this.props;
    onChange(value);
  }

  onRemove = () => {
    this.setState({ value: undefined });
    const { onChange } = this.props;
    onChange();
  }

  render() {
    const { value } = this.state;
    const { onUpload, onRemove } = this;
    return (
      <div className="image-upload">
        {value
          ? <Viewer value={value} onRemove={onRemove} />
          : <Upload
              onUpload={onUpload}
              renderLoading={<i className="fas fa-spin fa-spinner" />}/>
        }
      </div>
    );
  }
}

export default ImageUpload;
