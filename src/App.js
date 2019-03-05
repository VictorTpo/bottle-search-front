import React, { Component } from "react";
// import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
// import Error404 from "./components/Error404";
import Login from "./components/Login";
// import Logout from "./components/Logout";
// import Menu from "./components/Menu";
import Register from "./components/Register";
// import Search from "./components/Search";
// import User from "./components/User";

class Route extends Component {
  render() {
    if (this.props.exact && window.location.pathname !== this.props.path) {
      return null;
    } else if (!window.location.pathname.includes(this.props.path)) {
      return null;
    }
    const Component = this.props.component;
    return <Component />;
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <header>
            <h1>BottleFinder</h1>
            <ul>
              <li>{/* <Link to="/login">Login</Link>*/}</li>
              <li>{/* <Link to="/register">Register</Link> */}</li>
            </ul>
          </header>

          <div>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
