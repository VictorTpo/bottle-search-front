import React, { Component } from "react";

const BACK_HOST = "http://localhost:3000";
const LOGIN_PATH = "/login";

class Login extends Component {
  state = {
    email: "",
    password: "",
    login_errors: false,
    user_logged: false
  };

  login = event => {
    this.setState({ login_errors: false });

    fetch(BACK_HOST + LOGIN_PATH, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ user_logged: true });
          localStorage.setItem(
            "user_token",
            response.headers.get("authorization")
          );
          localStorage.setItem("user_id", response.json()["id"]);
        } else if (response.status === 401) {
          this.setState({ login_errors: true });
        }
      })
      .then(result => {
        if (localStorage.getItem("user_token")) {
          this.props.history.push("/search");
        }
      });
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.login();
  };

  render() {
    var error_login_class = this.state.login_errors
      ? "alert alert-danger"
      : "hidden";
    var logged_class = this.state.user_logged
      ? "alert alert-success"
      : "hidden";
    return (
      <div className="row">
        <form className="col-md-4 offset-md-1" onSubmit={this.handleSubmit}>
          <h3>Sign in</h3>
          <div className={error_login_class}>Invalid email or password</div>
          <div className={logged_class}>Logged!</div>

          <div className="form-group">
            <input
              id="email"
              type="text"
              placeholder="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              id="password"
              type="password"
              placeholder="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-outline-primary"
              disabled={!this.validateForm()}
            />
          </div>
        </form>
        <div className="col-md-5">
          <h3>Sign up</h3>
          Not register yet?
          <br />
          <a href="register">Create an account</a>
        </div>
      </div>
    );
  }
}

export default Login;
