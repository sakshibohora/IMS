import React, { Component } from 'react';
import AuthService from './AuthService';
import { Alert } from 'reactstrap';
import logo from '../images/bacancy-technology2.png'
import '../CSS/Login.css'
import $ from 'jquery';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      pword: '',
      collapse: false
    }

    this.Auth = new AuthService();
    this.handleLogin = this.handleLogin.bind(this);
    this.ChangeValue = this.ChangeValue.bind(this);
  }


  componentWillMount() {
    if (this.Auth.loggedIn())
      this.props.history.replace('/home');
  }

  handleLogin(e) {
    e.preventDefault();

    this.Auth.login(this.state.uname, this.state.pword)
      .then(res => {
        let role = res.User.role
        if (role)
          this.props.history.replace('/admin');
        else
        this.props.history.replace('/home')
      })
      .catch(err => {
        if (this.state.collapse === false) this.setState({ collapse: !this.state.collapse });
      })
  }

  ChangeValue(e, field) {
    e.preventDefault();
    this.setState({ [field]: e.target.value });
    this.setState({ collapse: false });
  }


  componentDidMount() {
    // var working = false;
    // $('.login').on('submit', function (e) {
    //   e.preventDefault();
    //   if (working) return;
    //   working = true;
    //   var $this = $(this),
    //     $state = $this.find('button > .state');
    //   $this.addClass('loading');
    //   $state.html('Authenticating');
    //   setTimeout(function () {
    //     $this.addClass('ok');
    //     $state.html('Welcome back!');
    //     setTimeout(function () {
    //       $state.html('Log in');
    //       $this.removeClass('ok loading');
    //       working = false;
    //     }, 4000);
    //   }, 3000);
    // });
  }
  render() {
    return (
      <>
        <div class="wrapper">
          <form class="login" onSubmit={(e) => this.handleLogin(e)}>
            <img src={logo} alt='no logo found' ></img>
            <input type="text" value={this.state.uname} onChange={(e) => this.ChangeValue(e, 'uname')} placeholder="Username" onClick={() => this.setState({ uname: '' })} required />
            <i class="fa fa-user"></i>
            <input type="text" value={this.state.pword} onChange={(e) => this.ChangeValue(e, 'pword')} placeholder="Password" onClick={() => this.setState({ pword: '' })} required />
            <i class="fa fa-key"></i>
            <a href="">Forgot your password?</a>

            <button>
              {/* <i class="spinner"></i> */}
              <span class="state">Log in</span>
            </button>

          </form>
          <Alert color="danger" isOpen={this.state.collapse}>
            Invaild Username or Password!
          </Alert>
        </div>
      </>

    )
  }
}

export default Login;
