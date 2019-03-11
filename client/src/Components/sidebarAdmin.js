import React, { Component } from "react";
import { Link } from 'react-router-dom';
import withAuth from './withAuth';
class SidebarAdmin extends Component {
  render() {
    return (
      <>
        <ul className="sidebar navbar-nav">
          <li className="nav-item active">
            <Link to='/admin/viewProfile' className="nav-link">
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
              <h6 className="dropdown-header">Admin Side Screen :</h6>
              <Link to='/admin/a0/adduser' className="dropdown-item">Add User</Link>
              <Link to='/admin/a0/listuser' className="dropdown-item">list User</Link>
              <Link to='/admin/a1/addcomponent' className="dropdown-item">Add Component</Link>
              <Link to='/admin/a1/listcomponent' className="dropdown-item">List Component</Link>
              {/* <Link to='/home/viewIncidentStatus' className="dropdown-item">Incident Status</Link> */}
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

export default withAuth(SidebarAdmin);







