import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
import { Alert } from 'reactstrap'

let formData = {
  id: '',
  username: '',
  firstName: '',
  password: '',
  email: '',
  role: '',
  status: '',
}
class ManageUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: { ...formData },
      flag: false, //false = insert, true = edit
      collapse: false,
    }
    this.Auth = new AuthService()
    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  componentWillMount() {
    if (this.props.id != undefined)
      this.getData(this.props.id)
  }

  getData(rowId) {
    const header = this.Auth.getToken()
    axios.get('http://localhost:8080/api/users/find/' + rowId)
      .then(response => {
        console.log(response)
        this.setState({
          formData: response.data.data,
          flag: true
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const data = {
      username: this.state.formData.username,
      password: this.state.formData.password,
      firstName: this.state.formData.firstName,
      lastName: this.state.formData.lastName,
      email: this.state.formData.email,
      contactNo: this.state.formData.contactNo,
      role: this.state.formData.role,
      status: this.state.formData.status,
    }
    e.preventDefault();
    if (this.state.flag === true) {
      axios.put('http://localhost:8080/api/users/edit' + this.props.id, this.state.formData)
        .then((res) => {
          this.props.makeData()
          this.setState({ collapse: true })
        }).catch((err) => {
          console.log(err)
        })
    } else {
      axios.post('http://localhost:8080/api/users', this.state.formData)
        .then((res) => {
          this.props.makeData()
          this.setState({ collapse: true })
        }).catch((err) => {
          console.log(err)
        })
    }
  }
  handleChange(e, target, field) {
    e.preventDefault();
    const temp = { ...this.state[target] };
    temp[field] = e.target.value;
    this.setState({ [target]: temp })
  }
  render() {
    return (
      <>
        <form onSubmit={(e) => { this.handleFormSubmit(e) }}>
          <div className="row">
            <div className="col-5" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" placeholder="Enter username"
                  value={this.state.formData.username}
                  onChange={(e) => { this.handleChange(e, 'formData', 'username') }} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" placeholder="Password"
                  value={this.state.formData.password}
                  onChange={(e) => { this.handleChange(e, 'formData', 'password') }} />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" placeholder="First Name"
                  value={this.state.formData.firstName}
                  onChange={(e) => { this.handleChange(e, 'formData', 'firstName') }} />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" placeholder="Last Name"
                  value={this.state.formData.lastName}
                  onChange={(e) => { this.handleChange(e, 'formData', 'lastName') }} />
              </div>
            </div>
            <div className="col-5" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" placeholder="Enter email"
                  value={this.state.formData.email}
                  onChange={(e) => { this.handleChange(e, 'formData', 'email') }} />
              </div>
              <div className="form-group">
                <label htmlFor="contactno">Contact No</label>
                <input type="text" className="form-control" placeholder="Contact No."
                  value={this.state.formData.contactNo}
                  onChange={(e) => { this.handleChange(e, 'formData', 'contactNo') }} />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input type="text" className="form-control" placeholder="Role"
                  value={this.state.formData.role}
                  onChange={(e) => { this.handleChange(e, 'formData', 'role') }} />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input type="text" className="form-control" placeholder="Status"
                  value={this.state.formData.status}
                  onChange={(e) => { this.handleChange(e, 'formData', 'status') }} />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-lg sg-submit-button" style={{ margin: "10px" }}>Submit</button>
        </form>
        <Alert color="primary" isOpen={this.state.collapse}>
          Your DATA has been updated!
        </Alert>
      </>
    )
  }
}
export default ManageUser