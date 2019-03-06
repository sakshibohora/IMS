import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Components/Login'
import Home from './Components/Home'
import Footer from './Components/Footer';
import './App.css';
import Admin from './Components/Admin';
import ViewComponentStatus from './Components/ViewComponentStatus';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <>
            {/* <Route exact path='/' component={Main} /> */}
            <Route exact path='/' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/admin' component={Admin} />
            <Route exact path='/home/viewComponentStatus' component={ViewComponentStatus} />
            {/* <Redirect from='/admin' to='/home' /> 
            <Redirect to='/admin' from='/home' />  */}
          </>
        </Router>
        <Footer />
      </>
    );
  }
};


export default App;
