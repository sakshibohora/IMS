import React, { Component } from 'react';
import axios from 'axios';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { Button } from 'reactstrap';
import AuthService from './AuthService';
import Select from 'react-select'


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
      categoryType: 'Select Category',
      componentName: 'Select Component',
      firstName: 'Select Name',
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
  }
  componentDidMount() {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/api/users/find/` + this.props.id, {
      headers: {
        'Authorization': header
      },
    })
      .then(response => {
        this.setState({ formdata: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    axios.get(`${process.env.REACT_APP_SERVER}/api/categories/getCategoryId`, {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({ cId: response.data.data })
    })
      .catch(function (error) {
        console.log(error);
      })

    axios.get(`${process.env.REACT_APP_SERVER}/api/users/name`, {
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
  ChangeValue(e, currentUser, field2) {
    e.preventDefault();
    const temp = { ...this.state[currentUser] };
    temp[field2] = e.target.value;
    this.setState({ [currentUser]: temp });
  }

  changeValue1 = (selectedOption) => {
    this.setState({ selectedOption });
    this.setState({ categoryId: selectedOption.value })
    const data = {
      categoryId: selectedOption.value
    }
    const header = this.Auth.getToken()
    axios.post(`${process.env.REACT_APP_SERVER}/api/components/getComponentName`, data, {
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

  changeValue2 = (componentName) => {
    this.setState({ componentName });
    this.setState({ componentId: componentName.value })
  }

  changeValue3(e) {
    this.setState({ issue: e.target.value })
    this.setState({ collapse: false });
  }

  changeValue4 = (firstName) => {
    this.setState({ firstName });
    this.setState({ assignedBy: firstName.value })
  }

  handleUpdateData(e) {
    e.preventDefault();
    const data = {
      userId: this.state.formdata.id,
      categoryId: this.state.categoryId,
      componentId: this.state.componentId,
      assignedBy: this.state.assignedBy,
    }
    console.log(data)
    const header = this.Auth.getToken();
    axios.post(`${process.env.REACT_APP_SERVER}/api/assignedcomponent`, data, {
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
              <label htmlFor="selectcategory">Select Category</label>
              <Select className="label1"
                options={this.state.cId.map(e => ({
                  label: e.categoryType,
                  value: e.id
                }))}
                value={this.selectedOption}
                onChange={(e) => { this.changeValue1(e) }}
              />
              <br /><br />
              <label htmlFor="selectcomponent">Select Component</label>

              <Select className="label1"
                options={this.state.cName.map(e => ({
                  label: e.componentName,
                  value: e.id
                }))}
                value={this.selectedOption}
                onChange={(e) => { this.changeValue2(e) }}
              />
              <br />
              <br />
              <label htmlFor="selectname">Assigned By</label>
              <Select className="label1"
                options={this.state.uname.map(e => ({
                  label: e.firstName,
                  value: e.id
                }))}
                value={this.selectedOption}
                onChange={(e) => { this.changeValue4(e) }}
              />
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


{/* <label htmlFor="selectcomp">Select Component</label>
              <ButtonDropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                <DropdownToggle caret>{this.state.componentName}</DropdownToggle>
                <DropdownMenu>
                  {this.state.cName.map(e => {
                    return (
                      <DropdownItem id={e.id} key={e.id} onClick={(e) => { this.changeValue2(e) }}>{e.componentName}
                      </DropdownItem>)
                  })}
                </DropdownMenu>
              </ButtonDropdown> */}