import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import AuthService from './AuthService';

let formdata = {
  incidentBy: '',
  incidentName: '',
  incident: '',
  updates: '',
  resolvedBy: '',
  status: '',

}
class EditIncidents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      dropdownOpen1: false,
      firstName: 'Select Name',
      formdata: { ...formdata },
    }
    this.Auth = new AuthService()
    this.handleUpdateData = this.handleUpdateData.bind(this)
    this.ChangeValue = this.ChangeValue.bind(this);
    this.changeValue1 = this.changeValue1.bind(this);
    this.toggle = this.toggle.bind(this)
  }
  componentDidMount() {
    console.log("component did mount")
    axios.get('http://localhost:8080/api/incidents/find/' + this.props.match.params.id)
      .then(response => {
        console.log("incident find", response.data)
        this.setState({ formdata: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    const header = this.Auth.getToken()

    axios.get('http://localhost:8080/api/users/name', {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({ arr: response.data.data })
      console.log("user res", this.state.arr)
      this.setState({ collapse: false });
    }).catch(function (error) {
      console.log(error);
    })
  }
  handleUpdateData(e) {
    e.preventDefault();
    const fpt = {
      incidentBy: this.state.formdata.incidentBy,
      incidentName: this.state.formdata.incidentName,
      incident: this.state.formdata.incident,
      updates: this.state.formdata.updates,
      status: this.state.formdata.status,
      resolvedBy: this.state.resolvedBy,
    }
    axios.put('http://localhost:8080/api/incidents/edit/' + this.props.match.params.id, fpt)
      .then((response) => {
        this.props.history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  toggle(e) {
    this.setState(prevState => ({
      dropdownOpen1: !prevState.dropdownOpen1
    }));
  }
  ChangeValue(e, currentUser, field2) {
    e.preventDefault();
    const temp = { ...this.state[currentUser] };
    temp[field2] = e.target.value;
    this.setState({ [currentUser]: temp });
  }
  changeValue1(e) {
    this.setState({ firstName: e.currentTarget.textContent });
    let id = e.currentTarget.getAttribute("id");
    this.setState({ resolvedBy: id })
    console.log(this.state.formdata.resolvedBy)
  }
  render() {
    console.log(this.props)
    return (
      <>
        <form onSubmit={(e) => this.handleUpdateData(e)}>
          <div className="row">
            <div className="col-4" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="incidentby">Incident By</label>
                <input type="text" className="form-control"
                  value={this.state.formdata.incidentBy}
                  onChange={(e) => this.ChangeValue(e, 'formdata', 'incidentBy')} />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">Incident Name</label>
                <input type="text" className="form-control"
                  value={this.state.formdata.incidentName}
                  onChange={(e) => { this.ChangeValue(e, 'formdata', 'incidentName') }} />
              </div>
              <div className="form-group">
                <label htmlFor="incident">Incident</label>
                <input type="text" className="form-control"
                  value={this.state.formdata.incident}
                  onChange={(e) => { this.ChangeValue(e, 'formdata', 'incident') }} />
              </div>
            </div>
            <div className="col-4" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="updates">Updates</label>
                <input type="text" className="form-control"
                  value={this.state.formdata.updates}
                  onChange={(e) => { this.ChangeValue(e, 'formdata', 'updates') }} />
              </div>

              <div className="form-group">
                <label htmlFor="resolvedby">Resolved By</label>

                <ButtonDropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle}>
                  <DropdownToggle caret>{this.state.firstName}</DropdownToggle>
                  <DropdownMenu>
                    {this.state.arr.map(e => {
                      return (
                        <DropdownItem id={e.id} key={e.id} onClick={(e) => { this.changeValue1(e) }}>{e.firstName}
                        </DropdownItem>)
                    })}
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                Done<input style={{ margin: "10px" }}
                  type="radio"
                  name="done"
                  value="done"
                  checked={this.state.formdata.status === "done"}
                  onChange={(e) => { this.ChangeValue(e, 'formdata', 'status') }}
                />
                Not Done<input style={{ margin: "10px" }}
                  type="radio"
                  name="done"
                  value="Not done"
                  checked={this.state.formdata.status === "Not done"}
                  onChange={(e) => { this.ChangeValue(e, 'formdata', 'status') }}
                />
              </div>
              <Button type="submit" className="btn btn-md sg-submit-button" value="Update" color="primary" > Update</Button>&nbsp;
            <Button type="button" className="btn btn-md sg-submit-button" value="Home" color="primary" onClick={() => this.props.history.push('/admin/adminhome')} > Home </Button>

            </div>
          </div>
        </form>
      </>
    )
  }

}
export default EditIncidents;