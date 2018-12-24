const MyMenu = (props) => {
    if(props.user_logged){
      return(<h5>logged!</h5>)
    }else{
      return(<h5>unknow</h5>)
    }
  }
import React, { Component } from 'react';

class Menu extends Component {
  render(){
    return(
      <div>My account</div>
    )
  }
}

export default Menu;
