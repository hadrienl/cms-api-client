import React from 'react';
import { Field, FormSpy } from 'react-final-form';
import DayPickerInput from 'react-day-picker/DayPickerInput'

import Group from '../Group';
import Local from './Local';

export class Control extends React.Component {
  state = {};

  componentDidUpdate({ formValues: prevFormValues }) {
    const { formValues, groupState, control: { name, local } } = this.props;

    if (local &&
        groupState[name] === undefined &&
        formValues !== prevFormValues) {
      const value = this.getValue();
      groupState.setState({
        [name]: value,
      });
    }
  }

  onChange = ({ target: { value, checked } }) => {
    const { control: { name, type }, groupState: { setState } } = this.props;
    setState({
      [name]: ['checkbox', 'radio'].includes(type)
        ? checked
        : value,
    });
  }

  getComponent () {
    const { control: { type } } = this.props;

    switch (type) {
      case 'text':
        return {
          component: 'input'
        };
      case 'checkbox':
        return {
          component: 'input',
          type: 'checkbox',
        };
      case 'date':
        return {
          component: ({ input: { value, onChange } }) => (
            <DayPickerInput
              value={value}
              format="YYYY-MM-DD"
              placeholder="YYYY-MM-DD"
              onDayChange={onChange}
            />
          ),
        };
      default:
        return {
          component: 'input'
        };
    }
  }

  isHidden() {
    const { control: { hidden } } = this.props;
    return this.eval(hidden);
  }

  getValue() {
    const { control: { initialValue } } = this.props;
    return this.eval(initialValue);
  }

  eval(expr) {
    const { groupState: local, formValues: form } = this.props;
    const test = Function('local', 'form', `return ${expr}`); // eslint-disable-line no-new-func
    return test(local, form);
  }

  render () {
    const { groupState, control: { type, name, label = '', local, ...control } } = this.props;

    if (this.isHidden()) return null;

    if (type === 'group') {
      return (
        <Group
          controls={control.controls}
        />
      );
    }

    const Container = local
      ? Local
      : Field;
    const component = this.getComponent();
    const containerProps = {
      name,
      ...component,
    };

    if (local) {
      containerProps.onChange = this.onChange;
      if (['checkbox', 'radio'].includes(type)) {
        containerProps.checked = !!groupState[name];
      } else {
        containerProps.value = groupState[name];
      }
    }

    const labelFirst = !['checkbox', 'radio'].includes(type);

    return (
      <div>
        <label>
          {labelFirst && `${label} :`}
          <Container
            {...containerProps}
          />
          {!labelFirst && ` ${label}`}
        </label>
      </div>
    );
  }
}

export default props =>
  <FormSpy>{({ values }) =>
    <Control
      formValues={values}
      {...props} />
  }</FormSpy>;