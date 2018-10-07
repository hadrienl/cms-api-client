import React from 'react';
import PropTypes from 'prop-types';

export default function createFormComponent({ Provider, CONTROLS }) {
  class Form extends React.Component {
    static propTypes = {
      component: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
      ]),
      validators: PropTypes.shape({
        '*'/* control name */: PropTypes.shape({
          /*
           * Preset validators
           */
          required: PropTypes.bool,
          maxLength: PropTypes.bool,
          /**
           * Custom validators
           */
          '*': PropTypes.func
        })
      })
    };

    static defaultProps = {
      component: 'form',
    };

    state = {
      pristine: true,
      touhed: false,
      valid: false,
      errors: [],
    };

    validate = () => {
      const values = Array.from(CONTROLS.values());
      const [allValids, allPristine, allErrors] = values.reduce(([isValid, isPristine, allErrors], { valid, pristine, name, errors }) =>
        [
          isValid && valid,
          isPristine && pristine,
          errors.length
          ? [...allErrors, name]
          : [...allErrors]
        ], [true, true, []]);
      const result = { valid: allValids, pristine: allPristine, touched: !allPristine, errors: allErrors };
      this.setState(result);
      return result;
    }

    values () {
      return Array.from(CONTROLS.values()).reduce((values, { name, value }) => ({
        ...values,
        [name]: value,
      }), {});
    }

    reset = () => {
      const controls = Array.from(CONTROLS.keys());
      controls.forEach(({ reset }) => reset());
    }

    render() {
      const { children, component: Component, validators } = this.props;
      const { validate, reset, values } = this;
      const value = {
        ...this.state,
        validators,
        validate,
        reset,
        values,
      }

      return (
        <Provider
          value={value}>
          <Component>
            {typeof children === 'function'
            ? children(value)
            : children}
          </Component>
        </Provider>
      )
    }
  }

  return Form;
}
