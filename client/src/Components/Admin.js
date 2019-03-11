import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import AuthService from './AuthService';
import withAuth from './withAuth';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import ViewProfile from './ViewProfile';
import SidebarAdmin from './sidebarAdmin';
import A0 from './0'
import A1 from './1'
const Auth = new AuthService();

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
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
          <SidebarAdmin />
          <div id="content-wrapper" >
            <Route exact path={`${match.url}/viewProfile`} render={() =>
              <ViewProfile {...this.props}
              />
            }
            />
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
            {/* <Redirect to={`${match.url}/a0/listuser`} from={`${match.url}/a0`} /> */}
          </div>
        </div>
      </>
    );
  }
}

Admin.defaultProps = {
  match: {},
};
Admin.propTypes = {
  match: PropTypes.object,
};
export default withAuth(Admin);


