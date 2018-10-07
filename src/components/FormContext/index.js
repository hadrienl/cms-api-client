import React from 'react';

import createFormComponent from './Form';
import createControlComponent from './Control';

export default function createForm() {
  const { Provider, Consumer: FormState } = React.createContext();
  const CONTROLS = new Map();
  const Form = createFormComponent({ Provider, CONTROLS });
  const Control = createControlComponent({ FormState, CONTROLS });

  return { Form, Control, FormState };
}
