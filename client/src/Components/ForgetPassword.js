import React, { Component } from 'react';
import axios from 'axios';

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = (e) => {
    e.preventDefault();
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
        })
        .then((response) => {
          console.log("sdfghju",response.data);
          if (response.data === 'recovery email sent') {
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent',
              showNullError: false,
            });
          }
        })
        .catch((error) => {
          // console.error(error.response.data);
          if (error.response.data === 'email not in db') {
            this.setState({
              showError: true,
              messageFromServer: '',
              showNullError: false,
            });
          }
        });
    }
  };

  render() {
    const {
      email, messageFromServer, showNullError, showError
    } = this.state;
    return (
      <div>
        {/* <HeaderBar title={title} /> */}
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
        {showNullError && (
          <div>
            <p>The email address cannot be null.</p>
          </div>
        )}
        {showError && (
          <div>
            <p>
              That email address isn&apos;t recognized. Please try again or
              register for a new account.
            </p>
            {/* <Link to='/user/userhome/viewProfile' onClick={() => this.closeNav()}>
            View Profile
          </Link> */}
            {/* <LinkButtons
              buttonText="Register"
              buttonStyle={registerButton}
              link="/register"
            /> */}
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}
        {/* <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" /> */}
      </div>
    );
  }
}

export default ForgotPassword;