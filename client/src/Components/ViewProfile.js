import React, { Component } from 'react'
import withAuth from './withAuth';
import AuthService from './AuthService';
import axios from 'axios'
import '../App.css'

class ViewProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      contactNo: ''
    }
    this.Auth = new AuthService()
    this.handleLogout=this.handleLogout.bind(this)
  }
  handleLogout() {
    this.Auth.logout()
    this.props.history.replace('/');
  }
  componentDidMount() {

    const header = this.Auth.getToken()
    const id = this.props.user.id
    const data = {
      id: id
    }
    axios.post('http://localhost:8080/api/users/getUserDetails', data, {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        email: response.data.data.email,
        contactNo: response.data.data.contactNo,
      })
    }).catch(function (error) {
      console.log(error);
    })
  }
  render() {
    return (
      <div className="container-fluid padding">
        <div className="row padding">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{this.state.firstName} {this.state.lastName}</h4>
                <p className="card-text">
                                  Email : {this.state.email}
                 
                  Contact No: {this.state.contactNo}
                </p>
                <button className="btn btn-outline-dark" onClick={() => this.props.history.push('/home')}>Home</button>
              </div>
              <input type='button' value='Logout' className="btn btn-danger" onClick={this.handleLogout.bind(this)} />
            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default withAuth(ViewProfile)









