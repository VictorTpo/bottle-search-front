import React, { Component } from 'react';

const BACK_HOST     = 'http://localhost:3000'
const REGISTER_PATH = '/users'

class Register extends Component {
  state = {
    email:            '',
    password:         '',
    confirm_password: '',
    full_name:        '',
    birthday:         '',
    same_passwords:   true,
    register_errors:  false,
    response_errors:  [],
    user_created:     false,
  }

  register = (event) => {
    this.setState({ register_errors: false })

    fetch(BACK_HOST + REGISTER_PATH, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:    this.state.email,
        password: this.state.password,
        full_name: this.state.full_name,
        birthday: this.state.birthday
      })
    })
      .then(response => {
        if(response.status === 200) {
          this.setState({ user_created: true })
        } else {
          this.setState({ register_errors: true })
        }
        return response.json()
      }).then(result => {
        if(this.state.register_errors){
          this.setState({ response_errors: result['messages'] })
        }
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    }, () => {
      this.setState({ same_passwords: this.state.password === this.state.confirm_password })
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.register();
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
        this.state.password.length > 0 &&
        this.state.full_name.length > 0 &&
        this.state.password === this.state.confirm_password
    )
  }

  errors_lines(){
    var response_errors = this.state.response_errors
    return(
      Object.keys(response_errors).map(function(k){
        return <li key={k}>{k}: {response_errors[k]}</li>
      })
    )
  }

  render(){
    var password_classes = this.state.same_passwords ? 'form-control' : 'form-control is-invalid'
    var user_created = this.state.user_created ? 'alert alert-success' : 'hidden'
    var errors_classes = this.state.register_errors ? 'alert alert-danger' : 'hidden'

    return(
      <form
          className = 'col-md-5 offset-md-1'
          onSubmit  = { this.handleSubmit }
        >
        <h3>Register</h3>

        <div className = { user_created }>Creation done!</div>
        <div className = { errors_classes }>
          Errors:
          <ul>{ this.errors_lines() }</ul>
        </div>

        <div className = 'form-group'>
          <input
            id          = 'email'
            type        = 'text'
            placeholder = 'email*'
            className   = 'form-control'
            value       = { this.state.email }
            onChange    = { this.handleChange }
            required
          />
        </div>
        <div className = 'form-group row'>
          <div className='col'>
            <input
              id          = 'password'
              type        = 'password'
              placeholder = 'password*'
              className   = { password_classes }
              value       = { this.state.password }
              onChange    = { this.handleChange }
            />
          </div>
          <div className = 'col'>
            <input
              id          = 'confirm_password'
              type        = 'password'
              placeholder = 'confirm password*'
              className   = { password_classes }
              value       = { this.state.confirm_password }
              onChange    = { this.handleChange }
            />
            <div className='invalid-feedback'>
              is not the same as password
            </div>
          </div>
        </div>
        <div className = 'form-group'>
          <input
            id          = 'full_name'
            type        = 'text'
            placeholder = 'full name*'
            className   = 'form-control'
            value       = { this.state.full_name }
            onChange    = { this.handleChange }
          />
        </div>
        <div className = 'form-group'>
          <input
            id          = 'birthday'
            type        = 'text'
            placeholder = 'birthday'
            className   = 'form-control'
            value       = { this.state.birthday }
            onChange    = { this.handleChange }
          />
        </div>
        <div className = 'form-group'>
          <input
            type      = 'submit'
            className = 'btn btn-outline-primary'
            disabled  = { !this.validateForm() }
          />
        </div>
      </form>
    )
  }
}

export default Register;
