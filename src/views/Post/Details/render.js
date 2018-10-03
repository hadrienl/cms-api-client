import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';

export const DetailsRender = ({ set, publishedAt, slug = '', isEvent, toggleIsEvent, eventFrom, eventTo }) => (
  <React.Fragment>
    <fieldset>
      <label>
        Slug :
        <input
          value={slug}
          onChange={set('slug')}
          />
      </label>

      <label>
        Publié le : 
        <DayPickerInput
          value={publishedAt}
          format="YYYY-MM-DD"
          placeholder="YYYY-MM-DD"
          onDayChange={set('publishedAt')}
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
          <DayPickerInput
            value={eventFrom}
            format="YYYY-MM-DD"
            placeholder="YYYY-MM-DD"
            onDayChange={set('eventFrom')}
            />
          au
          <DayPickerInput
            value={eventTo}
            format="YYYY-MM-DD"
            placeholder="YYYY-MM-DD"
            onDayChange={set('eventTo')}
            />
        </label>
      </React.Fragment>}
    </fieldset>
  </React.Fragment>
);

export default DetailsRender;
