import React from 'react';

import './styles.scss';

export const LayoutRender = ({ columns }) => (
  <div
    className="main-layout">
    {columns.map((column, key) => (
      <div
        key={key}
        className={`main-layout__col main-layout__col--${key + 1}`}>
        {column}
      </div>
    ))}
  </div>
);

export default LayoutRender;
