import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import AuthService from './AuthService';
import Simplert from 'react-simplert'
let formData = {
  incidentBy: '',
  incidentName: '',
  incident: '',
  updates: '',
  resolvedBy: '',
  status: '',

}
class ManageIncidents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: { ...formData },
      uname: [],
      resolvedBy: '',
      firstName: 'Select Name',
      flag: false, //false = insert, true = edit
      collapse: false,
    }
    this.Auth = new AuthService()
    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
    this.changeValue4 = this.changeValue4.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  componentWillMount() {
    if (this.props.id != undefined)
      this.getData(this.props.id)
  }
  getData(rowId) {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/api/incidents/find/` + rowId, {
      headers: {
        'Authorization': header
      },
    })
      .then(response => {
        console.log(response)
        this.setState({
          formData: response.data.data,
          flag: true
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  componentDidMount() {
    const header = this.Auth.getToken();
    axios.get(`${process.env.REACT_APP_SERVER}/api/users/name`, {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({ uname: response.data.data })
      console.log("user res", this.state.uname)
    }).catch(function (error) {
      console.log(error);
    })
  }
  handleFormSubmit(e) {
    e.preventDefault();
    const data = {
      incidentBy: this.state.formData.incidentBy,
      incidentName: this.state.formData.incidentName,
      incident: this.state.formData.incident,
      updates: this.state.formData.updates,
      resolvedBy: this.state.resolvedBy,
      status: this.state.formData.status,
    }
    console.log("formdata", this.state.formData)
    const header = this.Auth.getToken();
    axios.put(`${process.env.REACT_APP_SERVER}/api/incidents/edit/` + this.props.id, data, {
      headers: {
        'Authorization': header
      },
    })
      .then((res) => {
        console.log("edit", res.data)
        this.props.makeData()
        this.setState({ collapse: true });

      }).catch((err) => {
        console.log(err)
      })
  }
  handleChange(e, target, field) {
    e.preventDefault();
    const temp = { ...this.state[target] };
    temp[field] = e.target.value;
    this.setState({ [target]: temp })
  }
  changeValue4 = (firstName) => {
    this.setState({ firstName });
    this.setState({ resolvedBy: firstName.value })
    console.log("resolve", this.state.resolvedBy)
  }
  // changeValue4(e, target, field) {
  //   e.preventDefault();
  //   this.setState({ firstName: e.currentTarget.textContent });
  //   const temp = { ...this.state[target] };
  //   temp[field] = e.currentTarget.getAttribute("id");
  //   this.setState({ [target]: temp })
  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <div className="row">
            <div className="col-4" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="incidentby">Incident By</label>
                <input type="text" className="form-control"
                  value={this.state.formData.incidentBy}
                  onChange={(e) => this.handleChange(e, 'formData', 'incidentBy')} />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">Incident Name</label>
                <input type="text" className="form-control"
                  value={this.state.formData.incidentName}
                  onChange={(e) => { this.handleChange(e, 'formData', 'incidentName') }} />
              </div>
              <div className="form-group">
                <label htmlFor="incident">Incident</label>
                <input type="text" className="form-control"
                  value={this.state.formData.incident}
                  onChange={(e) => { this.handleChange(e, 'formData', 'incident') }} />
              </div>
            </div>
            <div className="col-4" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="updates">Updates</label>
                <input type="text" className="form-control"
                  value={this.state.formData.updates}
                  onChange={(e) => { this.handleChange(e, 'formData', 'updates') }} />
              </div>

              <div className="form-group">
                <label htmlFor="resolvedby">Resolved By</label>

                <Select className="label1"
                  options={this.state.uname.map(e => ({
                    label: e.firstName,
                    value: e.id
                  }))}
                  value={this.selectedOption}
                  onChange={(e) => { this.changeValue4(e) }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                In Process<input style={{ margin: "10px" }}
                  type="radio"
                  name="done"
                  value="In Process"
                  checked={this.state.formData.status === "In Process"}
                  onChange={(e) => { this.handleChange(e, 'formData', 'status') }}
                /><br />
                Done<input style={{ margin: "10px" }}
                  type="radio"
                  name="done"
                  value="done"
                  checked={this.state.formData.status === "done"}
                  onChange={(e) => { this.handleChange(e, 'formData', 'status') }}
                /><br />
                Not Done<input style={{ margin: "10px" }}
                  type="radio"
                  name="done"
                  value="Not done"
                  checked={this.state.formData.status === "Not done"}
                  onChange={(e) => { this.handleChange(e, 'formData', 'status') }}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ margin: "10px" }}>Submit</button>
            </div>
          </div>
        </form>
        <Simplert
          showSimplert={this.state.collapse}
          type={"success"}
          title={"alert"}
          message={'Updated Successfully'}
        />
      </>
    )
  }
}
export default ManageIncidents