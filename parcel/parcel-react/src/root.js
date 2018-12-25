import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
    <div>
      <App />
    </div>, MOUNT_NODE,
);