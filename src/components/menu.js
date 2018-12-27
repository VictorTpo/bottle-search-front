import React, { Component } from 'react';
import Logout from './logout';

class Menu extends Component {
  constructor(props){
    super(props)
    this.state = { user_logged: props.user_logged }
  }

  render(){
    if(this.state.user_logged){
      return(
        <nav className='nav'>
          <a className='nav-link' href='/search'>my cave</a>
          <a className='nav-link' href='/user'>my account</a>
          <Logout />
        </nav>
      )
    }else{
      return(
        <nav className='nav'>
          <a className='nav-link' href='/login'>login</a>
        </nav>
      )
    }
  }
}

export default Menu;
