import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

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
      firstName: 'Select Name',
      flag: false //false = insert, true = edit
    }
    this.Auth = new AuthService()
    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
    this.changeValue4 = this.changeValue4.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.toggle3 = this.toggle3.bind(this);

  }
  componentWillMount() {
    if (this.props.id != undefined)
      this.getData(this.props.id)
  }

  toggle3(e) {
    this.setState(prevState => ({
      dropdownOpen3: !prevState.dropdownOpen3
    }));
  }

  getData(rowId) {
    const header = this.Auth.getToken()
    axios.get('http://localhost:8080/api/incidents/find/' + rowId)
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
    axios.get('http://localhost:8080/api/users/name', {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({ uname: response.data.data })
      console.log("user res", this.state.uname)
      this.setState({ collapse: false });
    }).catch(function (error) {
      console.log(error);
    })
  }
  handleFormSubmit(e) {
    e.preventDefault();
    console.log(this.props.id)
    console.log("adsfghj", this.state.formData)
    axios.put('http://localhost:8080/api/incidents/edit/' + this.props.id, this.state.formData)
      .then((res) => {
        console.log("edit", res)
        this.props.makeData()
      }).catch((err) => {
        console.log(err)
      })
    // } else {
    //   console.log(this.state.formData)
    //   axios.post('http://localhost:8080/api/users', this.state.formData)
    //     .then((res) => {
    //       console.log(res, "jfkldsjfklds")
    //       this.props.makeData()

    //     }).catch((err) => {
    //       console.log(err)
    //     })
    // }
  }
  handleChange(e, target, field) {
    e.preventDefault();
    const temp = { ...this.state[target] };
    temp[field] = e.target.value;
    this.setState({ [target]: temp })
  }
  changeValue4(e, target, field) {
    e.preventDefault();
    this.setState({ firstName: e.currentTarget.textContent });
    const temp = { ...this.state[target] };
    temp[field] = e.currentTarget.getAttribute("id");
    this.setState({ [target]: temp })
  }
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

                <ButtonDropdown isOpen={this.state.dropdownOpen3} toggle={this.toggle3}>
                  <DropdownToggle caret>{this.state.firstName}</DropdownToggle>
                  <DropdownMenu>
                    {this.state.uname.map(e => {
                      return (
                        <DropdownItem id={e.id} key={e.id} onClick={(e) => { this.changeValue4(e, 'formData', 'resolvedBy') }}>{e.firstName}
                        </DropdownItem>)
                    })}
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                In process<input style={{ margin: "10px" }}
                  type="radio"
                  name="process"
                  value="process"
                  checked={this.state.formData.status === "process"}
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
      </>
    )
  }
}
export default ManageIncidents