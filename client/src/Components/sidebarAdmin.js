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
          <Link to='/admin/adminhome/viewProfile' onClick={() => this.closeNav()}>View Profile
           </Link>
           <Link to='/admin/adminhome/user' onClick={() => this.closeNav()}>Manage User</Link>
          <Link to='/admin/adminhome/category' onClick={() => this.closeNav()}>Manage Category</Link>
          <Link to='/admin/adminhome/component' onClick={() => this.closeNav()}>Manage Component</Link>
          <Link to='/admin/adminhome/incidents' onClick={() => this.closeNav()}>Manage Incidents</Link>
          <Link to='/admin/adminhome/assigncomponent' onClick={() => this.closeNav()} >Manage Requested Component</Link>
          {/* <Link to='/admin/adminhome/ListAssignedComponent' onClick={() => this.closeNav()} >All Assigned Component</Link> */}
        </div>
        <span style={{ cursor: "pointer" }} className="openBtn" onClick={() => this.openNav()}>&#9776;</span>
      </>
    );
  }
}
export default Sidebar;



// import React, { Component } from "react";
// import { Link } from 'react-router-dom';
// import withAuth from './withAuth';
// class SidebarAdmin extends Component {
//   render() {
//     return (
//       <>
//         <ul className="sidebar navbar-nav">
//           <li className="nav-item active">
//             <Link to='/admin/adminhome/viewProfile' className="nav-link">
//               <i className="fas fa-fw fa-tachometer-alt"></i>
//               <span>View Profile</span>
//             </Link>
//           </li>
//           <li className="nav-item dropdown">
//             <a className="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
//               <i className="fas fa-fw fa-folder"></i>
//               <span>Pages</span>
//             </a>
//             <div className="dropdown-menu" aria-labelledby="pagesDropdown">
//               <h6 className="dropdown-header">Admin Side Screen :</h6>
//               <Link to='/admin/adminhome/a0/adduser' className="dropdown-item">Add User</Link>
//               <Link to='/admin/adminhome/a0/listuser' className="dropdown-item">list User</Link>
//               <Link to='/admin/adminhome/a1/addcomponent' className="dropdown-item">Add Component</Link>
//               <Link to='/admin/adminhome/a1/listcomponent' className="dropdown-item">List Component</Link>
//               <Link to='/admin/adminhome/a2/addcategory' className="dropdown-item">Add Category</Link>
//               <Link to='/admin/adminhome/a2/listcategory' className="dropdown-item">List Category</Link>

// {/* 
// <Link to='/home/viewIncidentStatus' className="dropdown-item">Incident Status</Link> */}
//             </div>
//           </li>
//           {/* <li className="nav-item dropdown">
//             <a className="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//               <i className="fas fa-fw fa-folder"></i>
//               <span>Tables</span>
//             </a>
//             <div className="dropdown-menu" aria-labelledby="pagesDropdown">
//               <h6 className="dropdown-header">Tables</h6>
//               <label className="dropdown-item">Categories</label>
//               <label className="dropdown-item">Invoices</label>
//               <label className="dropdown-item"><Link to="/users">Users</Link></label>
//             </div>
//           </li> */}
//         </ul>
//       </>
//     );
//   }
// }

// export default withAuth(SidebarAdmin);
