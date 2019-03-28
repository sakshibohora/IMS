import React, { Component } from 'react';
import { Route } from "react-router-dom";
import AuthService from './AuthService';
import withAuth from './withAuth';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import ViewProfile from './ViewProfile';
import User from './User';
import Incidents from './Incidents';
import AssignRequestedComponent from './AssignRequestComponent';
import Category from './Category';
import Components from './Component';
import AllAssignedComponents from './AllAssignedComponents'
import HomePage from './HomePage';
import '../assets/css/style.css'

const Auth = new AuthService();

class AdminHome extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    Auth.logout()
    this.props.history.replace('/');
  }

  render() {
    const { match } = this.props
    return (
      <>
        <Navbar {...this.props} />
        <div id='wrapper'>
          <div id="content-wrapper" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <Route exact path={`${match.url}`} component={HomePage} />
            <Route exact path={`${match.url}/viewProfile`} render={() => <ViewProfile {...this.props} />} />
            <Route path={`${match.url}/user`} render={() => <User {...this.props} />} />
            <Route path={`${match.url}/category`} render={() => <Category {...this.props} />} />
            <Route path={`${match.url}/component`} render={() => <Components {...this.props} />} />
            <Route path={`${match.url}/assigncomponent`} render={() => <AssignRequestedComponent {...this.props} />} />
            <Route path={`${match.url}/incidents`} render={() => <Incidents {...this.props} />} />
            <Route path={`${match.url}/allassignedcomponents`} render={() => <AllAssignedComponents{...this.props} />}></Route>
          </div>
        </div>
      </>
    );
  }
}

AdminHome.defaultProps = {
  match: {},
};
AdminHome.propTypes = {
  match: PropTypes.object,
};
export default withAuth(AdminHome);