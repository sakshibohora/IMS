import React, { Component } from 'react';
import { Route} from "react-router-dom";
import AuthService from './AuthService';
import withAuth from './withAuth';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import ViewProfile from './ViewProfile';
import RequestComponent from './RequestComponent'
import RaiseIssue from './RaiseIssue';
import ViewComponentStatus from './ViewComponentStatus';

const Auth = new AuthService();

class Admin extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth = new AuthService();
  }

  handleLogout() {
    Auth.logout()
    this.props.history.replace('/login');
  }

  componentDidMount() {
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
          <div id="content-wrapper" >
            <Route path='/home/viewProfile' render={() => (<ViewProfile {...this.props} />)} />
            <Route path='/home/requestComponent' render={() => (<RequestComponent {...this.props} />)} />
            <Route path='/home/raiseIssue' render={() => (<RaiseIssue {...this.props} />)} />
            <Route path='/home/viewComponentStatus' render={() => (<ViewComponentStatus {...this.props} />)} />
          </div>
        </div>

      </>
    )
  }
}

export default withAuth(Admin);