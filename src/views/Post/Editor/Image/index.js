import React from 'react';
import PropTypes from 'prop-types';

import Upload from '../../../../components/Upload';

export class Image extends React.Component {
  static propTypes = {
    onUpload: PropTypes.func,
  };

  static defaultProps = {
    onUpload: () => null,
  };

  uploaded = ({ url, filename }) => {
    const { alt, onUpload } = this.props;
    onUpload({ alt, src: url, filename });
  }

  render() {
    const { src, alt } = this.props;
    const { uploaded } = this;

    if (src) {
      return <img src={src} alt={alt} />
    }

    return (
      <Upload
        onUpload={uploaded} />
    )
  }
};

export default Image;
