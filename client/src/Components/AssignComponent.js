import React, { Component } from 'react';
import axios from 'axios';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { Button } from 'reactstrap';
import AuthService from './AuthService';

let formdata = {
  id: '',
  username: '',
  firstName: '',
  email: '',
  role: '',
  status: '',
}
class AssignComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cId: [],
      cName: [],
      uname: [],
      formdata: { ...formdata },
      componentId: '',
      categoryId: 'Select Category',
      dropdownOpen1: false,
      componentName: 'Select Component',
      dropdownOpen2: false,
      firstName: 'Select Name',
      dropdownOpen3: false,
      issue: '',
      collapse: false
    }
    this.Auth = new AuthService()
    this.handleUpdateData = this.handleUpdateData.bind(this)
    this.ChangeValue = this.ChangeValue.bind(this);

    this.changeValue1 = this.changeValue1.bind(this)
    this.changeValue2 = this.changeValue2.bind(this)
    this.changeValue3 = this.changeValue3.bind(this)
    this.changeValue4 = this.changeValue4.bind(this)


    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
  }

  toggle(e) {
    this.setState(prevState => ({
      dropdownOpen1: !prevState.dropdownOpen1
    }));
  }

  toggle2(e) {
    this.setState(prevState => ({
      dropdownOpen2: !prevState.dropdownOpen2
    }));
  }
  toggle3(e) {
    this.setState(prevState => ({
      dropdownOpen3: !prevState.dropdownOpen3
    }));
  }
  componentDidMount() {
    const header = this.Auth.getToken()
    axios.get('http://localhost:8080/api/users/find/' + this.props.id)
      .then(response => {
        this.setState({ formdata: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    axios.get('http://localhost:8080/api/categories/getCategoryId', {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({ cId: response.data.data })
    })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:8080/api/users/name', {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({ uname: response.data.data })
      this.setState({ collapse: false });
    }).catch(function (error) {
      console.log(error);
    })
  }

  changeValue1(e) {
    this.setState({ categoryId: e.currentTarget.textContent });
    let id = e.currentTarget.getAttribute("id");
    const data = {
      categoryId: id
    }
    const header = this.Auth.getToken()
    axios.post('http://localhost:8080/api/components/getComponentName', data, {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({ cName: response.data.data })
      this.setState({ collapse: false });
    }).catch(function (error) {
      console.log(error);
    })
  }
  ChangeValue(e, currentUser, field2) {
    e.preventDefault();
    const temp = { ...this.state[currentUser] };
    temp[field2] = e.target.value;
    this.setState({ [currentUser]: temp });
  }
  changeValue2(e) {
    this.setState({ componentName: e.currentTarget.textContent });
    let id = e.currentTarget.getAttribute("id")
    this.setState({ componentId: id })
    this.setState({ collapse: false });
  }
  changeValue3(e) {
    this.setState({ issue: e.target.value })
    this.setState({ collapse: false });
  }
  changeValue4(e) {
    this.setState({ firstName: e.currentTarget.textContent });
    let id = e.currentTarget.getAttribute("id");
    this.setState({ assignedBy: id })
  }

  handleUpdateData(e) {
    e.preventDefault();
    const data = {
      userId: this.state.formdata.id,
      categoryId: this.state.categoryId,
      componentId: this.state.componentId,
      assignedBy: this.state.assignedBy,
    }

    const header = this.Auth.getToken();
    axios.post('http://localhost:8080/api/assignedcomponent', data, {
      headers: {
        'Authorization': header
      },
    })
      .then((response) => {
        if (this.state.collapse === false) this.setState({ collapse: !this.state.collapse });
        this.setState({ categoryId: 'Select Category', componentName: 'Select Component' })
      })
      .catch(function (error) {
        console.log("asssas", error);
      })
  }

  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleUpdateData(e)}>
          <div className="row">
            <div className="col-4" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" placeholder="Enter username"
                  value={this.state.formdata.username}
                  onChange={(e) => this.ChangeValue(e, 'formdata', 'userame')} />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" placeholder="First Name"
                  value={this.state.formdata.firstName}
                  onChange={(e) => { this.ChangeValue(e, 'formdata', 'firstName') }} />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" placeholder="Enter email"
                  value={this.state.formdata.email}
                  onChange={(e) => { this.ChangeValue(e, 'formdata', 'email') }} />
              </div>
            </div>
            <div className="col-3" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="contactno">Contact No</label>
                <input type="text" className="form-control" placeholder="Contact No."
                  value={this.state.formdata.contactNo}
                  onChange={(e) => { this.ChangeValue(e, 'formdata', 'contactNo') }} />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input type="text" className="form-control" placeholder="Role"
                  value={this.state.formdata.role}
                  onChange={(e) => { this.ChangeValue(e, 'formdata', 'role') }} />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input type="text" className="form-control" placeholder="Status"
                  value={this.state.formdata.status}
                  onChange={(e) => { this.props.ChangeValue(e, 'formdata', 'status') }} />
              </div>
            </div>
            <div className="col-4" style={{ margin: "10px" }}>
              <label htmlFor="selectname">Select Category</label>
              <ButtonDropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle}>
                <DropdownToggle caret>{this.state.categoryId}</DropdownToggle>
                <DropdownMenu>
                  {this.state.cId.map(e => {
                    return (
                      <DropdownItem id={e.id} key={e.id} onClick={(e) => { this.changeValue1(e) }}>{e.id}
                      </DropdownItem>)
                  })}
                </DropdownMenu>
              </ButtonDropdown>
              <br /><br />
              <label htmlFor="selectcomp">Select Component</label>
              <ButtonDropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                <DropdownToggle caret>{this.state.componentName}</DropdownToggle>
                <DropdownMenu>
                  {this.state.cName.map(e => {
                    return (
                      <DropdownItem id={e.id} key={e.id} onClick={(e) => { this.changeValue2(e) }}>{e.componentName}
                      </DropdownItem>)
                  })}
                </DropdownMenu>
              </ButtonDropdown>
              <br />
              <br />
              <label htmlFor="selectname">Assigned By</label>
              <ButtonDropdown isOpen={this.state.dropdownOpen3} toggle={this.toggle3}>
                <DropdownToggle caret>{this.state.firstName}</DropdownToggle>
                <DropdownMenu>
                  {this.state.uname.map(e => {
                    return (
                      <DropdownItem id={e.id} key={e.id} onClick={(e) => { this.changeValue4(e) }}>{e.firstName}
                      </DropdownItem>)
                  })}
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </div>
          <Button className="btn btn-md sg-submit-button" type="submit" value="Update" color="primary" > Assign</Button>&nbsp;
          <Button className="btn btn-md sg-submit-button" type="button" value="Home" color="primary" onClick={() => this.props.history.push('/admin/adminhome')} > Home </Button>
        </form>
      </>
    )
  }
}
export default AssignComponent;