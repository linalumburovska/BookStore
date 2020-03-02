import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import './App.css';

import Login from './login/Login';
import AllBooks from "./allBooks/AllBooks";

/* Main App component with routes */
class App extends Component{

    render() {
        /* Local storage to store the state if the user is logged in or not */
        localStorage.setItem('loggedIn', false);
        return(
          <Router>
              <div>
                  <Switch>
                      <Route exact path="/" component={Login} />
                      <Route exact path="/allBooks" component={AllBooks} />
                  </Switch>
              </div>
          </Router>
        )
    }
}

export default App;
