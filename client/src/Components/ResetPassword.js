import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'reactstrap'

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/users/reset/' + this.props.match.params.token)
      .then((response) => {
        console.log(response);
        if (response.data.message === 'password reset link a-ok') {
          this.setState({
            username: response.data.username,
            updated: false,
            isLoading: false,
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

    // await axios
    //   .get('http://localhost:8080/api/users/reset/'+this.props.match.params.token, {
    //     // params: {
    //     //   resetPasswordToken: this.props.match.params.token,
    //     // },
    //   })
    //   .then(response => {
    //     console.log(response);
    //     if (response.data.message === 'password reset link a-ok') {
    //       this.setState({
    //         username: response.data.username,
    //         updated: false,
    //         isLoading: false,
    //         error: false,
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error.response.data);
    //     this.setState({
    //       updated: false,
    //       isLoading: false,
    //       error: true,
    //     });
    //   });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = e => {
    e.preventDefault();
    axios
      .put('http://localhost:8080/api/users/updatePasswordViaEmail', {
        username: this.state.username,
        password: this.state.password,
        resetPasswordToken: this.props.match.params.token,
      })
      .then(response => {
        console.log(response.data);
        if (response.data.message === 'password updated') {
          this.setState({
            updated: true,
            error: false,
          });
        } else {
          this.setState({
            updated: false,
            error: true,
          });
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

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
      <div>
        <form className="form-control" onSubmit={this.updatePassword}>
          <input type="password"
            id="password"
            label="password"
            onChange={this.handleChange('password')}
            value={password}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            style={{ margin: "10px" }}>
            Update Password
        </button>
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
      </div>
    );
  }
}
ResetPassword.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};
