import React from 'react';
import ReactDOM from 'react-dom';

/* JS */
// import App from './App';
import Login from './components/login';
import * as serviceWorker from './serviceWorker';

/* CSS */
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

ReactDOM.render(<Login />, document.getElementById('root'));

serviceWorker.unregister();
