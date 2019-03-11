import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Components/Login'
import Home from './Components/Home'
import Footer from './Components/Footer';
import './App.css';
import Admin from './Components/Admin';
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/home' render={props => <Home {...props} />} />
            <Route path='/admin' render={props => <Admin {...props} />} />
          </Switch>
        </Router>
        <Footer />
      </>
    );
  }
};


export default App;
