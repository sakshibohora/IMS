import React, { Component } from 'react';
import { Route } from "react-router-dom";
import AuthService from './AuthService';
import withAuth from './withAuth';
import Navbar from './Navbar';
import PropTypes from 'prop-types';
import ViewProfile from './ViewProfile';
import RequestComponent from './RequestComponent'
import RaiseIncidents from './RaiseIncident';
import ViewComponentStatus from './ViewComponentStatus';
import ViewIncidentDetails from './ViewIssueStatus';
import HomePage from './HomePage';

const Auth = new AuthService();

class UserHome extends Component {

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
          <div id="content-wrapper" style={{ height: "100%", paddingTop: '0px', paddingBottom: '0px' }} >
            <Route exact path={`${match.url}`} component={HomePage} />
            <Route exact path={`${match.url}/viewProfile`} render={() => <ViewProfile {...this.props} />} />
            <Route exact path={`${match.url}/requestComponent`} render={() => <RequestComponent {...this.props} />} />
            <Route exact path={`${match.url}/raiseIncidents`} render={() => <RaiseIncidents {...this.props} />} />
            <Route exact path={`${match.url}/viewComponentStatus`} render={() => <ViewComponentStatus {...this.props} />} />
            <Route exact path={`${match.url}/viewIncidentStatus`} render={() => <ViewIncidentDetails {...this.props} />} />
          </div>
        </div>
      </>
    )
  }
}

UserHome.defaultProps = {
  match: {},
};
UserHome.propTypes = {
  match: PropTypes.object,
};
export default withAuth(UserHome);