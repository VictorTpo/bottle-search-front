import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
// import Error404 from "./components/Error404";
import Login from "./components/Login";
// import Logout from "./components/Logout";
// import Menu from "./components/Menu";
import Register from "./components/Register";
// import Search from "./components/Search";
// import User from "./components/User";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <header>
            <h1>BottleFinder</h1>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </header>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
