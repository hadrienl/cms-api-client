import React from 'react';

import './styles.css'

export const ListRender = ({ loading, files }) => (
  <div
    className="files-list">
    {loading && <p>Wait for it</p>}
    {files.map(({ id, url, name }) => (
      <figure
        key={id}>
        <img
          className="files-list__file"
          src={url}
          alt={name} />
        <figcaption>{name}</figcaption>
      </figure>
    ))}
  </div>
);

export default ListRender;
