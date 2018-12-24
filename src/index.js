import React from 'react';
import ReactDOM from 'react-dom';

/* JS */
import App from './App';
import * as serviceWorker from './serviceWorker';

/* CSS */
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
