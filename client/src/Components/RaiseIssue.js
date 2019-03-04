import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
import withAuth from './withAuth';
import { Alert } from 'reactstrap';

class RaiseIssue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      collapse: false
    }
    this.Auth = new AuthService()
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleChange(e, field) {
    this.setState({ [field]: e.target.value })
    this.setState({ toggle: false })
  }

  handleClick() {
    this.props.history.replace('/home');
  }

  handleFormSubmit(e) {
    const data = {
      incidentBy: this.props.user.id,
      incidentName: this.state.title,
      incident: this.state.description,
    }
    e.preventDefault();
    const header = this.Auth.getToken();
    console.log(header)
    axios.post('http://localhost:8080/api/incidents', data, {

      headers: {
        'Authorization': header
      },
    })
      .then((response) => {
        console.log(response);
        if (this.state.collapse === false) this.setState({ collapse: !this.state.collapse });
        this.setState({title:'', description:''})
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  render() {
    return (
      <div>
        <form onSubmit={(e) => { this.handleFormSubmit(e) }}>
          Issue title  <br /><input
            placeholder="Title goes here..."
            name="title"
            type="text"
            value={this.state.title}
            onChange={(e) => { this.handleChange(e, 'title') }}
            onClick={()=>{this.setState({collapse:false})}}
            required
          />
          <br />
          Issue description <br />
          <textarea
            placeholder="Description goes here..."
            name="description"
            value={this.state.description}
            onChange={(e) => { this.handleChange(e, 'description') }}
            onClick={()=>{this.setState({collapse:false})}}
          /><br />
          <input
            className="form-submit"
            value="Raise Issue"
            type="submit"
          />
        </form>
        <button type="button" className="form-submit" onClick={this.handleClick.bind(this)}>Home</button>
        <Alert color="danger" isOpen={this.state.collapse}>
         Issue request has been sent to Admin!
        </Alert>
      </div>

    )
  }
}
export default withAuth(RaiseIssue);
