import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home     from './components/home';
import Error404 from './components/error_404';
import Login    from './components/login';
import Logout   from './components/logout';
import Menu     from './components/menu';
import Register from './components/register';
import Search   from './components/search';
import User     from './components/user';

class App extends Component {
  state = {
    user_logged: ![null, undefined].includes(localStorage.getItem('user_id'))
  }

  render() {
    return(
      <div className='container'>
        <header>
          <h1>BottleFinder</h1>
          <Menu user_logged = { this.state.user_logged } />
        </header>
        <BrowserRouter>
          <Switch>
            <Route path='/'         component = { Home } exact  />
            <Route path='/login'    component = { Login }       />
            <Route path='/logout'   component = { Logout }      />
            <Route path='/register' component = { Register }    />
            <Route path='/search'   component = { Search }      />
            <Route path='/user'     component = { User }        />
            <Route component = { Error404 } />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
