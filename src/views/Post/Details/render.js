import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';

import { Control } from '../PostForm';

export const DetailsRender = ({ className, publishedAt, slug = '', isEvent, toggleIsEvent, eventFrom, eventTo }) => (
  <div
    className={className}>
    <fieldset>
      <label>
        Slug :
        <Control
          name="slug"
          value={slug}
        />
      </label>

      <label>
        Publié le : 
        <Control
          name="publishedAt"
          value={publishedAt}
          component={({ value, changeValue }) => (
            <DayPickerInput
              value={value}
              format="YYYY-MM-DD"
              placeholder="YYYY-MM-DD"
              onDayChange={changeValue}
            />
          )}
        />
      </label>
    </fieldset>

    <fieldset>
      <label>
        <input
          type="checkbox"
          checked={isEvent}
          onChange={toggleIsEvent}/>
        Évenement ?
      </label>
      {isEvent && <React.Fragment>
        <label>
          du
          <Control
            name="eventFrom"
            value={eventFrom}
            component={({ value, changeValue }) => (
              <DayPickerInput
                value={value}
                format="YYYY-MM-DD"
                placeholder="YYYY-MM-DD"
                onDayChange={changeValue}
                />
              )}
          />
          au
          <Control
            name="eventTo"
            value={eventTo}
            component={({ value, changeValue }) => (
              <DayPickerInput
                value={value}
                format="YYYY-MM-DD"
                placeholder="YYYY-MM-DD"
                onDayChange={changeValue}
                />
              )}
          />
        </label>
      </React.Fragment>}
    </fieldset>
  </div>
);

export default DetailsRender;
