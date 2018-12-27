import React, { Component } from 'react';
// import { Redirect } from 'react-router';

const BACK_HOST = 'http://localhost:3000'
const LOGOUT_URL = '/logout'

class Logout extends Component {
  logout = (event) => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('user_token')
    }

    fetch(BACK_HOST + LOGOUT_URL, {
      method: 'DELETE',
      headers: headers
    }).then(response => {
      localStorage.removeItem('user_id')
      localStorage.removeItem('user_token')
    }).then(result => {
      // TODO
    })
  }

  render() {
    return(
      <button onClick = { this.logout } className='btn btn-link'>
        logout
      </button>
    )
  }
}

export default Logout;
