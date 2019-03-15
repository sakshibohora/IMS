import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './Components/Login'
import UserHome from './Components/UserHome'
import Footer from './Components/Footer';
import './App.css';
import AdminHome from './Components/AdminHome';
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/user/userhome' render={props => <UserHome {...props} />} />
            <Route path='/admin/adminhome' render={props => <AdminHome {...props} />} />
            <Redirect from='/*' to='/' />
          </Switch>
        </Router>
        <Footer />
      </>
    );
  }
};
export default App;
