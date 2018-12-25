import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

const MOUNT_NODE = document.getElementById('root');

render(
  <div>
    <App />
  </div>, MOUNT_NODE,
);
