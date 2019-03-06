import React, { Component } from "react";
import { Link } from 'react-router-dom';
import withAuth from './withAuth';
class Sidebar extends Component {
  render() {

    return (
      <>
        <ul className="sidebar navbar-nav">
          <li className="nav-item active">
            <Link to='/home/viewProfile' className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>View Profile</span>
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <i className="fas fa-fw fa-folder"></i>
              <span>Pages</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="pagesDropdown">
              <h6 className="dropdown-header">User Side Screens:</h6>
              <Link to='/home/requestComponent' className="dropdown-item">RequestComponent</Link>
              <Link to='/home/raiseIssue' className="dropdown-item">Raise Issue</Link>
              <Link to='/home/viewComponentStatus' className="dropdown-item">Requested Component Status</Link>
              <Link to='/home/viewIncidentStatus' className="dropdown-item">Incident Status</Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-fw fa-folder"></i>
              <span>Tables</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="pagesDropdown">
              <h6 className="dropdown-header">Tables</h6>
              <label className="dropdown-item">Categories</label>
              <label className="dropdown-item">Invoices</label>
              <label className="dropdown-item"><Link to="/users">Users</Link></label>

            </div>

          </li>
        </ul>
      </>
    );
  }
}

export default withAuth(Sidebar);







