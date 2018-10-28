import React from 'react';

import './styles.scss';

export const LoadingRender = props => (
  <div className="loading">
    Loading
    <span className="loading__dot">.</span>
    <span className="loading__dot">.</span>
    <span className="loading__dot">.</span>
  </div>
);

export default LoadingRender;
