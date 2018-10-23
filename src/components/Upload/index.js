import React from 'react';
import PropTypes from 'prop-types';

import { uploadFile } from '../../services/files';

export class Upload extends React.Component {
  static propTypes = {
    onUpload: PropTypes.func,
    renderLoading: PropTypes.object,
  };

  static defaultProps = {
    onUpload: () => null,
  };

  state = {
    loading: false,
  }
  upload = async ({ target: { files } }) => {
    const { onUpload } = this.props;
    const file = Array.from(files)[0];

    if (!file) return;
    this.setState({ loading: true });
    const { url, filename } = await uploadFile(file);
    this.setState({ loading: false });
    onUpload({ url, filename });
  }

  render() {
    const { renderLoading, className } = this.props;
    const { loading } = this.state;
    const { upload } = this;

    return (
      <span className={className}>
        {(renderLoading && loading)
          ? renderLoading
          : <input
              value=""
              type="file"
              onChange={upload}
              disabled={loading} />
        }
      </span>
    );
  }
};

export default Upload;
