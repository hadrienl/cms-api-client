import React from 'react';

export const FormRender = ({ setEmail, setPassword, submit, error }) => (
  <form
    onSubmit={submit}>
    {error &&
    <p>{error}</p>}
    <input
      type="email"
      onChange={setEmail} />
    <input
      type="password"
      onChange={setPassword} />
    <button
      type="submit">
      Connexion
    </button>
  </form>
);

export default FormRender;
