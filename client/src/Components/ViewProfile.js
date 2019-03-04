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
    }
    this.Auth = new AuthService()
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
        email: response.data.data.email
      })
    }).catch(function (error) {
      console.log(error);
    })
  }
  render() {
    return (
      <div className="row">
        {/* <form >
          First Name<br /><input value={this.state.firstName} disabled /><br />
          Last Name <br /><input value={this.state.lastName} disabled /><br />
          email <br /><input value={this.state.email} disabled /><br />
          <input type="button" className="form-submit" onClick={() => this.props.history.push('/home')} value="Home" />
          <input type='button' value='HomeMe' onClick={() => this.props.history.push('/login')} />
        </form> */}
        <div className="col-lg-3"></div>
        <div className="container col-lg-6">
          <form>
            <div class="form-group">
              <label for="firstnames">First Name</label>
              <input class="form-control col-4" aria-describedby="emailHelp" value={this.state.firstName} disabled />
            </div>
            <div class="form-group">
              <label for="firstnames">Last Name</label>
              <input class="form-control col-4" aria-describedby="emailHelp" value={this.state.lastName} disabled />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Email</label>
              <input class="form-control col-4" id="exampleInputPassword1" value={this.state.email} disabled />
            </div>
            <div class="form-group">
              <input type="button" className="form-submit" onClick={() => this.props.history.push('/home')} value="Home" />
              <input type='button' value='Home Me' onClick={() => this.props.history.push('/login')} />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-lg-3"></div>
      </div>
    )
  }
}
export default withAuth(ViewProfile)











