import React from 'react';
import { Switch } from '@blueprintjs/core';

import styles from './styles.module.scss';

export const FooterRender = ({ children, className, theme, switchTheme }) => (
  <div className={`${styles.mainFooter} ${className}`}>
    <div className={styles.mainFooter__title}>
      {children}
    </div>
    <div className={styles.mainFooter__theme}>
      Theme <Switch
        inline
        label={theme}
        checked={theme === 'light'}
        onChange={switchTheme}
      />
    </div>
  </div>
);

export default FooterRender;
