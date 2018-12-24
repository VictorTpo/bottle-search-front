import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import BottleSearch from './components/bottle_search';
import Error404 from './components/error_404';
import Login from './components/login';
import User from './components/user';

const Menu = (props) => {
  if(props.user_logged){
    return(
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to='/search'>My cave</Link></li>
            <li><Link to='/user'>My account</Link></li>
            <li><Link to='/logout'>logout</Link></li>
          </ul>
        </nav>
      </BrowserRouter>
    )
  }else{
    return(
      <BrowserRouter>
        <div className="dropdown-menu">
          <Link to='/' className='dropdown-item'>Home</Link>
          <Link to='/login' className='dropdown-item'>login</Link>
        </div>
      </BrowserRouter>
    )
  }
}

class App extends Component {
  state = {
    user_logged: false
  }


  render() {
    var home = this.state.user_logged ? User : Login

    return(
      <div>
        My app
        <nav>
          <Menu user_logged={this.state.user_logged} />
        </nav>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={home} exact />
            <Route path='/login' component={Login} />
            <Route path='/search' component={BottleSearch} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
