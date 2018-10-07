import React from 'react';
import PropTypes from 'prop-types';

import presetValidators from '../Validators';

const defaultControlState = {
  pristine: true,
  touched: false,
  valid: true,
  errors: [],
};

export default function createControlComponent({ FormState, CONTROLS }) {
  class Control extends React.PureComponent {
    static propTypes = {
      component: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
      ]),
      name: PropTypes.string.isRequired,
      value: PropTypes.any,
      validators: PropTypes.shape({
        '*': PropTypes.func,
      }),
    };

    static defaultProps = {
      component: ({ valid, pristine, touched, changeValue, ...domProps }) => <input {...domProps} />,
      validators: {},
      value: '',
    };

    state = {
      ...defaultControlState,
      value: this.props.value,
      name: this.props.name,
    };

    componentDidMount() {
      this.updateState();
    }

    componentDidUpdate({ value: prevValue }) {
      const { value } = this.props;
      if (value !== prevValue) {
        this.updateState({ value });
      }
    }

    componentWillUnmount() {
      CONTROLS.delete(this);
    }

    updateState (state) {
      if (state) {
        this.setState(state);
      }
      CONTROLS.set(this, {
        ...this.state,
        ...state,
      });
    }

    valueChanged =({ target: { value } }) => {
      return this.changeValue(value);
    }

    changeValue = value => {
      const { value: currentValue } = this.state;
      if (currentValue !== value) {
        const errors = this.validate(value);
        const valid = !errors.length;
        this.updateState({
          value,
          touched: true,
          valid,
          pristine: false,
          errors,
        });
      }
    }

    validate (value) {
      const validators = this.getValidatorsPresets(this.props.validators);
      const keys = Object.keys(validators);

      return keys.reduce((errors, key) => validators[key](value)
        ? [...errors]
        : [...errors, key], [])
    }

    getValidatorsPresets (validators) {
      return Object.keys(validators).reduce((filledValidators, validatorName) => {
        const validator = validators[validatorName];
        const filledValidator = typeof validator === 'function'
          ? validator
          : presetValidators[validatorName] && presetValidators[validatorName](validator);
        return filledValidator
          ? {
              ...filledValidators,
              [validatorName]: filledValidator,
            }
          : { ...filledValidator };
      }, {});
    }

    reset = () => {
      this.updateState({
        ...defaultControlState,
        value: this.props.value,
      });
    }

    render() {
      const { component: Component } = this.props;
      const { valueChanged, changeValue } = this;

      return (
        <Component
          {...this.state}
          onChange={valueChanged}
          changeValue={changeValue}
        />
      )
    }
  }

  return ({ validators, name, ...props }) => <FormState>
      {({ validators: { [name]: formValidators = {} } = {} }) =>
        <Control
          {...props}
          name={name}
          validators={{...validators, ...formValidators}}
        />}
    </FormState>;
}
