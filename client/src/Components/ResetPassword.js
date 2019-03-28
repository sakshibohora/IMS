import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AuthService from './AuthService';

import { Button, Alert } from 'reactstrap'
let formData = {
  password: '',
  confirmpassword: '',
}
export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      formData: { ...formData },
      username: '',
      updated: false,
      error: false,
      collapse: false,
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    const header = this.Auth.getToken();
    axios.get('http://localhost:8080/api/users/reset/' + this.props.match.params.token, {
      headers: {
        'Authorization': header
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.message === 'password reset link a-ok') {
          this.setState({
            username: response.data.username,
            updated: false,
            error: false,
          });
        }
      }).catch(error => {
        console.log("hjk", error.response.data);
        this.setState({
          updated: false,
          isLoading: false,
          error: true,
        });
      })
  }

  handleChange(e, target, field) {
    e.preventDefault();
    const temp = { ...this.state[target] };
    temp[field] = e.target.value;
    this.setState({ [target]: temp })
  }

  updatePassword = e => {
    const header = this.Auth.getToken();
    e.preventDefault();
    if (this.state.password === this.state.confirmpassword) {
      axios
        .put('http://localhost:8080/api/users/updatePasswordViaEmail', {
          username: this.state.username,
          password: this.state.formData.password,
          resetPasswordToken: this.props.match.params.token,
          headers: {
            'Authorization': header
          },
        })
        .then(response => {
          console.log(response.data);
          if (response.data.message === 'password updated') {
            this.setState({
              updated: true,
              error: false,
              collapse: true,
            });
          } else {
            this.setState({
              updated: false,
              error: true,
              collapse: false,
            });
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
    };
  }

  render() {
    const { password, updated } = this.state;

    if (this.state.error) {
      return (
        <div>
          <h4>Problem resetting password. Please send another reset link.</h4>
          <Button
            className="btn btn-md sg-submit-button"
            type="button" value="Home"
            color="primary"
            onClick={() => this.props.history.push('/')} >
            login
            </Button>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="container col-lg-9">
          <form onSubmit={(e) => { this.updatePassword(e) }}>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
                id="password"
                onChange={(e)=>{this.handleChange(e, 'formData', 'password')}}
                value={this.state.formData.password}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input type="password"
                id="confirmpassword"
                onChange={(e)=>{this.handleChange(e, 'formData', 'confirmpassword')}}
                value={this.state.formData.confirmpassword}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ margin: "10px" }}>
              Update Password
        </button>
            {/* <button type="submit" className="btn btn-md sg-submit-button">Raise Issue</button> */}
          </form>
          {updated && (
            <div>
              <p>
                Your password has been successfully reset, please try logging in
                again.
            </p>
              <Button
                className="btn btn-md sg-submit-button"
                type="button" value="Home"
                color="primary"
                onClick={() => this.props.history.push('/')} >
                login
            </Button>
            </div>
          )}
          <Alert color="primary" isOpen={this.state.collapse}>
            Your Password has been updated!
         </Alert>
        </div>
      </div>

      // <div className="row">
      //   <div className="col-lg-3"></div>
      //   <div className="container col-lg-9">
      //     <form className="form-group" onSubmit={this.updatePassword}>

      //       <button
      //         type="submit"
      //         className="btn btn-primary btn-sm"
      //         style={{ margin: "10px" }}>
      //         Update Password
      //   </button>
      //     </form>
      //   </div>

      // </div>
    );
  }
}
// ResetPassword.propTypes = {
//   // eslint-disable-next-line react/require-default-props
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       token: PropTypes.string.isRequired,
//     }),
//   }),
// };
