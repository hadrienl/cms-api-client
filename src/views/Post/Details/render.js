import React from 'react';
import CustomForm from '../../../components/CustomForm';

import controls from '../controls';

export const DetailsRender = ({ className, publishedAt, slug = '', isEvent, toggleIsEvent, eventFrom, eventTo }) => (
  <div
    className={className}>
    <CustomForm controls={controls} />
  </div>
);

export default DetailsRender;
