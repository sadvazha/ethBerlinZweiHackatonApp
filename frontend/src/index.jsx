import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App';

import './utils/socket';

render(
  <App />,
  document.getElementById('root'),
);
