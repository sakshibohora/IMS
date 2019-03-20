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
import ManageUser from './ManageUser';
import Category from './Category';
import Components from './Component';
import ManageCategory from './ManageCategory';
import ManageComponent from './ManageComponent';
import ManageRequestedComponent from './ManageRequestedComponent';
import ManageIncidents from './ManageIncidents';
// import IncidentUpdate from './IncidentUpdates';
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
          <div id="content-wrapper" >
            <Route exact path={`${match.url}/viewProfile`} render={() =>
              <ViewProfile {...this.props}
              />
            }
            />
            <Route exact path={`${match.url}/user`} render={() => <User {...this.props} />} />
            <Route exact path={`${match.url}/manageuser`} render={() => <ManageUser {...this.props} />} />
           
            <Route exact path={`${match.url}/category`} render={() => <Category {...this.props} />} />
            <Route exact path={`${match.url}/managecategory`} render={() => <ManageCategory {...this.props} />} />
            
            <Route exact path={`${match.url}/component`} render={() => <Components {...this.props} />} />
            <Route exact path={`${match.url}/managecomponent`} render={() => <ManageComponent {...this.props} />} />
           
            <Route exact path={`${match.url}/assigncomponent`} render={() => <AssignRequestedComponent {...this.props} />} />
            <Route exact path={`${match.url}/managerequestcomponent`} render={() => <ManageRequestedComponent {...this.props} />} />
            
            <Route exact path={`${match.url}/incidents`} render={() => <Incidents {...this.props} />} />
            <Route exact path={`${match.url}/manageincident`} render={() => <ManageIncidents {...this.props} />} />
          
            {/* <Route exact path={`${match.url}/manageincidents`} component={EditIncidents} /> */}
            {/* <Route path={`${match.url}/assigncomponent/:id`} component={AssignComponent} /> */}
            {/* <Route path={`${match.url}/ListRequestComponent`} render={() => <ListRequestComponent {...this.props} />} /> */}
            {/* <Route path={`${match.url}/ListAssignedComponent`} render={() => <ListAssignedComponent {...this.props} />} /> */}
            {/* <Route path={`${match.url}/assignrequestedcomponent/:id`} component={AssignRequestedComponent} /> */}
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


