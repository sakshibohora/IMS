import React, { Component } from 'react';
import { Route } from "react-router-dom";
import AuthService from './AuthService';
import withAuth from './withAuth';
import Navbar from './Navbar';
import PropTypes from 'prop-types';
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
  render() {
    const { match } = this.props;
    return (
      <>
        <Navbar {...this.props} />
        <div id='wrapper'>
          <Sidebar />
          <div id="content-wrapper" style={{ height: "100%" }} >
            <Route exact path={`${match.url}/viewProfile`} render={props => (<ViewProfile {...props} />)} />
            <Route exact path={`${match.url}/requestComponent`} render={props => (<RequestComponent {...props} />)} />
            <Route exact path={`${match.url}/raiseissue`} render={props => (<RaiseIssue {...this.props} />)} />
            <Route exact path={`${match.url}/viewComponentStatus`}render={props => (<ViewComponentStatus {...props} />)} />
            <Route exact path={`${match.url}/viewIncidentStatus`} render={props=> (<ViewIncidentStatus {...props} />)} />
          </div>
        </div>

      </>
    )
  }
}

Home.defaultProps = {
  match: {},
};
Home.propTypes = {
  match: PropTypes.object,
};

export default withAuth(Home);