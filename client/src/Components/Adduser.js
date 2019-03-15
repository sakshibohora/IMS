import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
class AddUser extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService()
    this.insertData = this.insertData.bind(this)
  }

  insertData(e) {
    e.preventDefault();
    if (this.props.flag === true) {
      axios.put('http://localhost:8080/api/users/edit' + this.props.id, this.props.formData)
        .then((res) => {
          console.log(res)
          this.props.updateState()
          this.props.history.push('/admin/adminhome/a0/listuser');
        }).catch((err) => {
          console.log(err)
        })
    } else {
      axios.post('http://localhost:8080/api/users', this.props.formData)
        .then((res) => {
          console.log(res)
          this.props.updateformData()
          this.props.history.push('/admin/adminhome/a0/listuser');
        }).catch((err) => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <>
        <form  onSubmit={(e) => { this.insertData(e) }}>
          <div className="row">
            <div className="col-5" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" placeholder="Enter username"
                  value={this.props.formData.username}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'username') }} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" placeholder="Password"
                  value={this.props.formData.password}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'password') }} />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" placeholder="First Name"
                  value={this.props.formData.firstName}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'firstName') }} />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" placeholder="Last Name"
                  value={this.props.formData.lastName}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'lastName') }} />
              </div>
            </div>
            <div className="col-5" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" placeholder="Enter email"
                  value={this.props.formData.email}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'email') }} />
              </div>
              <div className="form-group">
                <label htmlFor="contactno">Contact No</label>
                <input type="text" className="form-control" placeholder="Contact No."
                  value={this.props.formData.contactNo}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'contactNo') }} />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input type="text" className="form-control" placeholder="Role"
                  value={this.props.formData.role}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'role') }} />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input type="text" className="form-control" placeholder="Status"
                  value={this.props.formData.status}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'status') }} />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-lg sg-submit-button" style={{ margin: "10px" }}>Submit</button>
        </form>
      </>
    )
  }
}
export default AddUser