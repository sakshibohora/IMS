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
    let role=this.props.user.role
    return (
      <>
        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
          <Link className="navbar-brand mr-1" to="/">
            <img src={require("../images/bacancy-technology2.png")} height="40px" width="200px" />
          </Link>
          {this.props.user.role ? <SidebarAdmin /> : <Sidebar />}
          <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"></input>
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
          <ul className="navbar-nav ml-auto ml-md-0">
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.props.user.username}<i className="fas fa-user-circle fa-fw"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                {/* <a className="dropdown-item" href="#">Settings</a>
                <a className="dropdown-item" href="#">Activity Log</a> */}
                <div className="dropdown-divider"></div>
                {/* <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a> */}
                <input type='button' value='Logout' className="btn btn-danger" onClick={this.handleLogout.bind(this)} />
              </div>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default Navbar;