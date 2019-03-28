import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
import '../App.css'
import Simplert from 'react-simplert'

class RaiseIncidents extends Component {
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
    axios.post(`${process.env.REACT_APP_SERVER}/api/incidents`, data, {
      headers: {
        'Authorization': header
      },
    })
      .then((response) => {
        console.log(response);
        if (this.state.collapse === false) this.setState({ collapse: !this.state.collapse });
        this.setState({ title: '', description: '' ,collapse:true})
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="container col-lg-9">
          <form onSubmit={(e) => { this.handleFormSubmit(e) }}>
            <div className="form-group">
              <label htmlFor="issuetitle">Issue Title</label>
              <input type="text" className="form-control col-6" aria-describedby="emailHelp" value={this.state.title}
                onChange={(e) => { this.handleChange(e, 'title') }}
                onClick={() => { this.setState({ collapse: false }) }} required/>
            </div>
            <div className="form-group">
              <label htmlFor="issuedesc">Issue Description</label>
              <textarea className="form-control col-6" value={this.state.description}
                onChange={(e) => { this.handleChange(e, 'description') }}
                onClick={() => { this.setState({ collapse: false }) }} required/>
            </div>
            <button type="submit" className="btn btn-md sg-submit-button">Raise Issue</button>
          </form>
          <Simplert
          showSimplert={this.state.collapse}
          type={"success"}
          title={"alert"}
          message={'Incident sent Successfully'}
        />
        </div>
      </div>
    )
  }
}
export default RaiseIncidents;
