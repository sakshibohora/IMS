import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  openNav() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  closeNav() {
    this.setState({ isOpen: false })
  }
  render() {
    return (
      <>
        <div id="mySidenav" style={{ width: this.state.isOpen ? '250px' : '0px' }} className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={() => this.openNav()}>&times;</a>
          <Link to='/user/userhome/viewProfile' onClick={() => this.closeNav()}>
            View Profile
          </Link>
          <Link to='/user/userhome/requestComponent' className="menu-item" onClick={() => this.closeNav()}>
            Request Component
          </Link>
          <Link to='/user/userhome/raiseIncidents' className="menu-item" onClick={() => this.closeNav()}>
            Raise Incident
          </Link>
          <Link to='/user/userhome/viewComponentStatus' className="menu-item" onClick={() => this.closeNav()}>
            Requested Component Status
          </Link>
          <Link to='/user/userhome/viewIncidentStatus' className="menu-item" onClick={() => this.closeNav()}>
            Raise Incident Status
          </Link>
        </div>
        <span style={{ cursor: "pointer" }} className="openBtn" onClick={() => this.openNav()}>&#9776;</span>
      </>
    );
  }
}
export default Sidebar;








