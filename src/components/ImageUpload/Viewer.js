import React from 'react';

export class Viewer extends React.Component {
  remove = e => {
    e.preventDefault();
    const { onRemove } = this.props;
    onRemove();
  }

  preventDefault = e => e.preventDefault();

  render() {
    const { value } = this.props;
    const { remove, preventDefault } = this;

    return (
      <div className="image-upload-viewer">
        <div
          onClick={preventDefault}
          className="image-upload-viewer__display"
          style={{ backgroundImage: `url("${value}")` }}
        />
        <button
          className="image-upload-viewer__remove"
          type="button"
          onClick={remove}>
          <i className="fas fa-trash-alt" />
        </button>
      </div>
    );
  }
}

export default Viewer;
