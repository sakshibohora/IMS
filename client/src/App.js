import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from './Components/Login'
import Main from './Components/Main'
import Home from './Components/Home'
import Footer from './Components/Footer';
import './App.css';
import Admin from './Components/Admin';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <>
            <Route exact path='/' component={Main} />
            <Route exact path='/login' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/admin' component={Admin} />
            {/* <Redirect from='/*' to='/login' /> */}
          </>
        </Router>
        <Footer />
      </>
    );
  }
};


export default App;
