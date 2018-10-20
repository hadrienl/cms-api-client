import React from 'react';
import CustomForm from '../../../components/CustomForm';
import 'react-day-picker/lib/style.css';

import controls from '../controls';

export const DetailsRender = ({ className, publishedAt, slug = '', isEvent, toggleIsEvent, eventFrom, eventTo }) => (
  <div
    className={className}>
    <CustomForm controls={controls} />
  </div>
);

export default DetailsRender;
