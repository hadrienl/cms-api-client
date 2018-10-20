import React from 'react';
import { Field } from 'react-final-form';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';

export const DetailsRender = ({ className, publishedAt, slug = '', isEvent, toggleIsEvent, eventFrom, eventTo }) => (
  <div
    className={className}>
    <fieldset>
      <label>
        Slug :
        <Field
          name="slug"
          component="input"
        />
      </label>

      <label>
        Publié le : 
        <Field name="publishedAt">{({ input: { value, onChange }, meta }) => (
          <DayPickerInput
            value={value}
            format="YYYY-MM-DD"
            placeholder="YYYY-MM-DD"
            onDayChange={onChange}
          />
        )}</Field>
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
          <Field name="eventFrom">{({ input: { value, onChange }, meta }) => (
            <DayPickerInput
              value={value}
              format="YYYY-MM-DD"
              placeholder="YYYY-MM-DD"
              onDayChange={onChange}
              />
          )}</Field>
          au
          <Field name="eventTo">{({ input: { value, onChange }, meta }) => (
            <DayPickerInput
              value={value}
              format="YYYY-MM-DD"
              placeholder="YYYY-MM-DD"
              onDayChange={onChange}
              />
          )}</Field>
        </label>
      </React.Fragment>}
    </fieldset>
  </div>
);

export default DetailsRender;
