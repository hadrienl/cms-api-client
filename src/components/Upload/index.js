import React from 'react';
import PropTypes from 'prop-types';

import { uploadFile } from '../../services/files';

export class Upload extends React.Component {
  static propTypes = {
    onUpload: PropTypes.func,
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
    const { loading } = this.state;
    const { upload } = this;

    return (
      <input
        value=""
        type="file"
        onChange={upload}
        disabled={loading} />
    );
  }
};

export default Upload;
