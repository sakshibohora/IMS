import React, { Component } from "react";
import AuthService from './AuthService';
import Sidebar from './Sidebar';
import SidebarAdmin from './sidebarAdmin'
import { Link } from 'react-router-dom';
const Auth = new AuthService();
class Navbar extends Component {
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
    return (
      <>
        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
          <Link className="navbar-brand mr-1" to="/">
            <img src={require("../images/bacancy-technology2.png")} height="40px" width="200px" />
          </Link>
          {this.props.user.role ? <SidebarAdmin /> : <Sidebar />}
          <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div className="input-group">
            </div>
          </form>
          <ul className="navbar-nav ml-auto ml-md-0">
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.props.user.username}<i className="fas fa-user-circle fa-fw"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                <center>
                  <button className="btn btn-md sg-submit-button" value='Logout' style={{ borderRadius: "5px", alignSelf: 'center' }} onClick={this.handleLogout.bind(this)}>Logout</button>
                </center>
              </div>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default Navbar;