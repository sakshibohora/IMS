import React, { Component } from 'react'
import { Route } from "react-router-dom";
import AuthService from './AuthService';
import PropTypes from 'prop-types';
import ListUser from './listuser';
import AddUser from './Adduser'
import AssignComponent from './AssignComponent'

let formData = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  contactNo: '',
  role: '',
  status: '',
  email: '',
}
class a0 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      formData: { ...formData },
      flag: false,
      id: ''
    }
    this.Auth = new AuthService();
    this.updateData = this.updateData.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateformData = this.updateformData.bind(this);
    this.editData = this.editData.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  updateData(data) {
    this.setState({ data })
  }

  updateformData() {
    this.setState({ formData: { ...formData } })
  }

  updateState() {
    this.setState({ flag: false, formData: { ...formData }, id: '' })
  }
  editData(element) {
    const formData1 = {
      username: element.username,
      password: element.password,
      firstName: element.firstName,
      lastName: element.lastName,
      email: element.email,
      contactNo: element.contactNo,
      role: element.role,
      status: element.status,
    }
    this.setState({ formData: formData1, flag: true, id: element.id })

  }

  handleChange(e, target, field) {
    e.preventDefault();
    const temp = { ...this.state[target] };
    temp[field] = e.target.value;
    this.setState({ [target]: temp })
  }
  render() {
    const { match } = this.props
    return (
      <>
        <Route path={`${match.url}/listuser`} render={(props) =>
          <ListUser
            {...props}
            handleSearch={this.handleSearch}
            {...this.state}
            updateData={this.updateData}
            editData={this.editData}
          />
        }
        />

        <Route path={`${match.url}/adduser`} render={(props) =>
          <AddUser
            {...props}
            {...this.state}
            updateState={this.updateState}
            updateformData={this.updateformData}
            handleChange={this.handleChange}
          />
        }
        />
        <Route path={`${match.url}/assigncomponent`} render={(props) =>
          <AssignComponent
            {...props}
            {...this.state}
            updateState={this.updateState}
            updateformData={this.updateformData}
            handleChange={this.handleChange}
          />
        }
        />
      </>
    );
  }
}

a0.defaultProps = {
  match: {},
};
a0.propTypes = {
  match: PropTypes.object,
};
export default a0;
