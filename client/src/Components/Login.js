import React, { Component } from 'react';
import AuthService from './AuthService';
import { Alert } from 'reactstrap';
import logo from '../images/bacancy-technology2.png'
import '../assets/css/Login.css'

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
    if (this.Auth.loggedIn()) {
      if (this.Auth.getRole())
        this.props.history.replace('/admin/adminhome');
      else
        this.props.history.replace('/user/userhome');
    }
  }

  handleLogin(e) {
    e.preventDefault();
    this.Auth.login(this.state.uname, this.state.pword)
      .then(res => {
        let role = res.User.role;
        if (role)
          this.props.history.replace('/admin/adminhome');
        else
          this.props.history.replace('/user/userhome');
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
  }
  render() {
    return (
      <>
        <div className="wrapper" style={{ height: "100vh" }}>
          <form className="login" onSubmit={(e) => this.handleLogin(e)}>
            <img src={logo} alt='no logo found' ></img>
            <input type="text" value={this.state.uname} onChange={(e) => this.ChangeValue(e, 'uname')} placeholder="Username" onClick={() => this.setState({ uname: '' })} required />
            <i className="fa fa-user"></i>
            <input type="password" value={this.state.pword} onChange={(e) => this.ChangeValue(e, 'pword')} placeholder="Password" onClick={() => this.setState({ pword: '' })} required />
            <i className="fa fa-key"></i>
            <a href="/forgotPassword">Forgot password ?</a>
            <button>
             
              <span className="state">Log in</span>
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



