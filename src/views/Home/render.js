import React from 'react';

import { withState } from '../../services/State';

export const HomeRender = ({ state: { connectedUser: { email } = {}, foo } }) => console.log(foo) || (
  <p>Hello {email}</p>
);

export default withState(HomeRender);
