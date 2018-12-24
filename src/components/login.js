import React, { Component } from 'react';

const BACK_HOST = 'http://localhost:3000'
const LOGIN_URL = '/login'

class Login extends Component {
  state = {
    email: '',
    password: '',
    login_errors : false,
    user_logged: false
  }

  login = (event) => {
    this.setState({
      login_errors: false
    })
    fetch(BACK_HOST + LOGIN_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email:    this.state.email,
          password: this.state.password
        }
      })
    })
      .then(response => {
        if(response.status === 401) {
          this.setState({ login_errors: true })
        } else if(response.status === 200){
          this.setState({ user_logged: true })
        }
        let result = response.json()
        console.log('result', result)
      })
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.login();
  }

  render() {
    var error_login_class = this.state.login_errors ? 'alert alert-danger' : 'hidden'
    var logged_class = this.state.user_logged ? 'alert alert-success' : 'hidden'

    return(
      <div className = 'container row'>
        <form
          className = 'col-md-5 offset-md-1'
          onSubmit = { this.handleSubmit }
        >

          <div className = { error_login_class }>Invalid email or password</div>
          <div className = { logged_class }>Logged!</div>

          <div className = 'form-group'>
            <input
              id          = 'email'
              type        = 'text'
              placeholder = 'email'
              className   = 'form-control'
              value       = { this.state.email }
              onChange    = { this.handleChange }
            />
          </div>
          <div className = 'form-group'>
            <input
              id          = 'password'
              type        = 'password'
              placeholder = 'password'
              className   = 'form-control'
              value       = { this.state.password }
              onChange    = { this.handleChange }
            />
          </div>
          <div className = 'form-group'>
            <input
              type      = 'submit'
              className = 'btn btn-primary'
              disabled  = { !this.validateForm() }
            />
          </div>
        </form>
      </div>
    )
  }
}

export default Login;
