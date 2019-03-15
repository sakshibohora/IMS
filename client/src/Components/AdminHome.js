import React, { Component } from 'react';
import { Route } from "react-router-dom";
import AuthService from './AuthService';
import withAuth from './withAuth';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import ViewProfile from './ViewProfile';
import A0 from './0'
import A1 from './1'
import A2 from './2'
import AssignComponent from './AssignComponent';
import Incidents from './Incidents';
import EditIncidents from './EditIncidents';
import ListRequestComponent from './listRequstComponent';
import AssignRequestedComponent from './AssignRequestedComponent';
import ListAssignedComponent from './ListAssignedComponent';
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
            {/* <Route exact path={`${match.url}/incidentupdates`} render={() =>
              <IncidentUpdate {...this.props}
              />
            }
            /> */}
            <Route path={`${match.url}/a0`} render={(props) =>
              <A0
                {...props}
              />
            }
            />
            <Route path={`${match.url}/a1`} render={(props) =>
              <A1
                {...props}
              />
            }
            />
            <Route path={`${match.url}/a2`} render={(props) =>
              <A2
                {...props}
              />
            }
            />
            <Route exact path={`${match.url}/incidents`} render={() => <Incidents {...this.props} />} />
            <Route exact path={`${match.url}/editincidents/:id`} component={EditIncidents} />
            <Route path={`${match.url}/assigncomponent/:id`} component={AssignComponent} />
            <Route path={`${match.url}/ListRequestComponent`} render={() => <ListRequestComponent {...this.props} />} />
            <Route path={`${match.url}/ListAssignedComponent`} render={() => <ListAssignedComponent {...this.props} />} />
            <Route path={`${match.url}/assignrequestedcomponent/:id`} component={AssignRequestedComponent} />
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


