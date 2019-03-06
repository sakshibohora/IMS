import React, { Component } from 'react';
import { Route } from "react-router-dom";
import AuthService from './AuthService';
import withAuth from './withAuth';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import ViewProfile from './ViewProfile';
import RequestComponent from './RequestComponent'
import RaiseIssue from './RaiseIssue';
import ViewComponentStatus from './ViewComponentStatus';
import ViewIncidentStatus from './ViewIncidentStatus';

const Auth = new AuthService();

class Home extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth = new AuthService();
  }
  handleLogout() {
    Auth.logout()
    this.props.history.replace('/');
  }
  changeVisibility() {
    this.setState({ toggle: true })
  }
  render() {
    return (
      <>
        <Navbar {...this.props} />
        <div id='wrapper'>
          <Sidebar />
          <div id="content-wrapper" style={{ height: "100%" }} >
            <Route exact path='/home/viewProfile' render={() => (<ViewProfile {...this.props} />)} />
            <Route exact path='/home/requestComponent' render={() => (<RequestComponent {...this.props} />)} />
            <Route exact path='/home/raiseIssue' render={() => (<RaiseIssue {...this.props} />)} />
            <Route exact path='/home/viewComponentStatus' render={() => (<ViewComponentStatus {...this.props} />)} />
            <Route exact path='/home/viewIncidentStatus' render={() => (<ViewIncidentStatus {...this.props} />)} />
          </div>
        </div>

      </>
    )
  }
}

export default withAuth(Home);