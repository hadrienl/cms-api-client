import React from 'react';

import styles from './styles.module.scss';

export const HeaderRender = ({ theme, switchTheme }) => (
  <div className={styles.mainHeader}>
    <div className={styles.mainHeader__title}>
      Wait for a name CMS client
    </div>
  </div>
);

export default HeaderRender;
