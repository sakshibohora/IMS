import React, { Component } from 'react';
import axios from 'axios';
import AuthService from './AuthService';
import { Alert } from 'reactstrap'
class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      collapse: false,
    };
    this.Auth = new AuthService();
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = (e) => {
    e.preventDefault();
    const header = this.Auth.getToken();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    } else {
      axios
        .post('http://localhost:8080/api/users/forgotPassword/', {
          email,
          headers: {
            'Authorization': header
          },
        })
        .then((response) => {
          console.log("sdfghju", response.data);
          if (response.data === 'recovery email sent') {
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent',
              collapse:!this.state.collapse
            });
           // if (this.state.collapse === false) this.setState({ collapse: !this.state.collapse });
          }
        })
        .catch((error) => {
          if (error.response.data === 'email not in db') {
            this.setState({
              showError: true,
              messageFromServer: '',
            });
          }
        });
    }
  };

  render() {
    const {
      email
    } = this.state;
    return (
      <div>
        <form className="form-controls" onSubmit={this.sendEmail}>
          <input type="email"
            id="email"
            value={email}
            onChange={this.handleChange('email')}
            placeholder="Email Address"
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            style={{ margin: "10px" }}>
            Send Password Reset Email
        </button>
        </form>
        <Alert color="primary" isOpen={this.state.collapse}>
          Mail has been sent!
        </Alert>
      </div>
    )
  }
}
export default ForgotPassword;