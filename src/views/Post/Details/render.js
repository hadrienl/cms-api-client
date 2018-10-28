import React from 'react';
import CustomForm from '../../../components/CustomForm';

import controls from '../controls';
import styles from './styles.module.scss';

export const DetailsRender = ({ className, publishedAt, slug = '', isEvent, toggleIsEvent, eventFrom, eventTo }) => (
  <div
    className={`${className} ${styles.customForm}`}>
    <CustomForm controls={controls} />
  </div>
);

export default DetailsRender;
