import React from 'react';
import { Field, FormSpy } from 'react-final-form';
import { FormGroup, Checkbox, InputGroup } from '@blueprintjs/core';

import DateTimeInput from '../../DateTimeInput';
import Group from '../Group';
import Local from './Local';

const COMPONENTS = {
  text: ({ input, label }) => (
    <FormGroup
      label={label}>
      <InputGroup {...input} label={label} />
    </FormGroup>
  ),
  checkbox: Checkbox,
  date: ({ label, input: { value, onChange } }) => (
    <FormGroup
      label={label}>
      <DateTimeInput
        initialValue={value}
        format="YYYY-MM-DD"
        placeholder="YYYY-MM-DD"
        onChange={onChange}
      />
    </FormGroup>
  ),
}
export class Control extends React.Component {
  state = {};

  componentDidUpdate({ formValues: prevFormValues, initialValues: prevInitialValues }) {
    const { form: { change }, formValues, groupState, control: { name, local, hidden } } = this.props;

    if (local &&
        this.props.initialValues !== prevInitialValues &&
        formValues !== prevFormValues) {
      const value = this.getValue();
      groupState.setState({
        [name]: value,
      });
    }

    if (hidden) {
      if (this.isHidden()) {
        if (formValues[name]) {
          this._savedValue = formValues[name];
        }
        change(name, '');
      } else {
        if (this._savedValue) {
          change(name, this._savedValue);
        }
        delete this._savedValue;
      }
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
    return COMPONENTS[type] || COMPONENTS.text;
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
    const { groupState: { setState, ...local }, formValues: form } = this.props;
    const test = Function('local', 'form', 'window', `return ${expr}`); // eslint-disable-line no-new-func
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
    const containerProps = {
      name,
      component: this.getComponent(),
    };

    if (local) {
      containerProps.onChange = this.onChange;
      if (['checkbox', 'radio'].includes(type)) {
        containerProps.checked = !!groupState[name];
      } else {
        containerProps.value = groupState[name];
      }
    }

    return (
      <div>
        <label>
          <Container
            label={label}
            {...containerProps}
          />
        </label>
      </div>
    );
  }
}

export default props =>
  <FormSpy>{({ form, values, initialValues }) =>
    <Control
      form={form}
      formValues={values}
      initialValues={initialValues}
      {...props} />
  }</FormSpy>;