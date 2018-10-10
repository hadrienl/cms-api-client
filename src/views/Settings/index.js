import React from 'react';

import Form, { Control } from './Form';

export class Settings extends React.Component {
  render() {
    return (
      <div>
        <h2>Form test</h2>
        <Form
          validators={{
            coin: {
              required: true,
              maxLength: 10,
            },
          }}>
        {({ validate, valid, errors, values, reset }) => (
          <React.Fragment>
            <Control
              name="foo"
              component={({ valid, pristine, errors, ...controlProps }) => (
                <div>
                  <input
                    {...controlProps}
                  />
                  {!pristine && !valid &&
                  <p>{errors.join(', ')}</p>}
                </div>
              )}
              validators={{
                maxLength: value => value.length > 3
              }}
            />
            <div>
              <label>Coin</label>
              <Control
                name="coin"
                validators={{
                  minLength: 2,
                }}
                component={({ valid, pristine, errors, ...controlProps }) => (
                  <div>
                    <input
                      {...controlProps}
                    />
                    {!pristine && !valid &&
                    <p>{errors.join(', ')}</p>}
                  </div>
                )}
              />
            </div>
            <Control
              name="bar"
              value="bar"
              component={({ valid, pristine, errors, ...controlProps }) =>
                <div>
                  <select
                    {...controlProps}>
                    <option
                      value="foo">Foo</option>
                    <option
                      value="bar">Bar</option>
                  </select>
                  {!pristine && !valid &&
                  <p>{errors.join(', ')}</p>}
                </div>
              }
              valid
            />
            <button
              type="reset"
              onClick={reset}>
              Reset
            </button>
            <button
              type="button"
              onClick={() => validate && console.log(values()) }>
              Validate
            </button>
            {!valid &&
            <p>{errors.join(', ')}</p>}
          </React.Fragment>
        )}
        </Form>
      </div>
    );
  }
};

export default Settings;
