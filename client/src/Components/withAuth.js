import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService('http://localhost:8080');
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      }
    }
    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/')
      }
      else {
        if (Auth.getRole()) {
          this.props.history.replace('/admin/adminhome')
        }
        else {
          console.log("Going from withauth to home")
          this.props.history.replace('/user/userhome')
        }
        try {
          const profile = Auth.getProfile()
          this.setState({
            user: profile
          })
        }
        catch (err) {
          Auth.logout()
          this.props.history.replace('/')
        }
      }
    }
    render() {
      if (this.state.user) {
        return (
          <AuthComponent {...this.props} user={this.state.user} />
        )
      }
      else {
        return null
      }
    }
  }
}