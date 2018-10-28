import React from 'react';

import styles from './styles.module.scss';

export const LoadingRender = props => (
  <div className={styles.loading}>
    Loading
    <span className={styles.loadingDot}>.</span>
    <span className={styles.loadingDot}>.</span>
    <span className={styles.loadingDot}>.</span>
  </div>
);

export default LoadingRender;
