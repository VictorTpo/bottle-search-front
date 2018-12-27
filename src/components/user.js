import React, { Component } from 'react';

const BACK_HOST = 'http://localhost:3000'
const USER_ME_PATH = '/users/me'

class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      init_user:        false,
      email:            '',
      password:         '',
      confirm_password: '',
      full_name:        '',
      birthday:         '',
      same_passwords:   true,
      update_errors:    false,
      response_errors:  [],
      user_updated:     false,
    }
    this.init_user()
  }

  init_user = (event) => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('user_token')
    }
    fetch(BACK_HOST + USER_ME_PATH, {
      method: 'GET',
      headers: headers
    })
      .then(response => {
        if(response.status === 200){
          this.setState({ init_user: true })
        }
        return response.json()
      }).then(result => {
        if(this.state.init_user){
          this.setState({
            email: result['user']['email'],
            full_name: result['user']['profile']['full_name'],
            birthday: result['user']['profile']['birthday'],
          })
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
    this.update();
  }

  errors_lines(){
    var response_errors = this.state.response_errors
    return(
      Object.keys(response_errors).map(function(k){
        return <li key={k}>{k}: {response_errors[k]}</li>
      })
    )
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
        this.state.password.length > 0 &&
        this.state.full_name.length > 0 &&
        this.state.password === this.state.confirm_password
    )
  }


  renderForm(){
    var password_classes = this.state.same_passwords ? 'form-control' : 'form-control is-invalid'
    var user_updated = this.state.user_updated ? 'alert alert-success' : 'hidden'
    var errors_classes = this.state.register_errors ? 'alert alert-danger' : 'hidden'

    return(
      <form
        className = 'col-md-5 offset-md-1'
        onSubmit  = { this.handleSubmit }
      >
      <h3>My account</h3>

      <div className = { user_updated }>Update done!</div>
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

  render(){
    if(this.state.init_user){
      return this.renderForm()
    }else{
      return(
        <div className='row'>
          <div className='offset-md-1 col-md-3 alert alert-warning'>
            Something went wrong :/<br />Please come back later
          </div>
        </div>
      )
    }
  }
}

export default User;
