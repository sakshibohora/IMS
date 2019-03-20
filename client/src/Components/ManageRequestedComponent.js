import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
import { Alert } from 'reactstrap'


let formData = {
  userId: '',
  categoryId: '',
  componentId: '',
  componentName: '',
  issue: '',
  status: '',
}
class ManageRequestedComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: { ...formData },
      collapse: false,
      flag: false //false = insert, true = edit
    }
    this.Auth = new AuthService()
    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  componentWillMount() {
    if (this.props.id != undefined)
      this.getData(this.props.id)
  }

  getData(rowId) {
    const header = this.Auth.getToken()
    axios.get('http://localhost:8080/api/requestcomponents/find/' + rowId)
      .then(response => {
        console.log(response)
        this.setState({
          formData: response.data.data,
          flag: true,

        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  handleChange(e, target, field) {
    e.preventDefault();
    const temp = { ...this.state[target] };
    temp[field] = e.target.value;
    this.setState({ [target]: temp })
  }

  handleFormSubmit(e) {
    e.preventDefault();

    if (this.state.flag === true) {
      axios.put('http://localhost:8080/api/requestComponents/edit/' + this.props.id, this.state.formData)
        .then((res) => {
          console.log(res)
          this.props.makeData()
          this.setState({
            collapse: true
          })
        }).catch((err) => {
          console.log(err)
        })
    } else {
      axios.post('http://localhost:8080/api/requestComponents', this.state.formData)
        .then((res) => {
          console.log(res)
          this.props.makeData()
          this.props.toggleEdit()
          this.setState({
            collapse:true
          })
        }).catch((err) => {
          console.log(err)
        })
    }
  }
  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <div className="row">
            <div className="col-4" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="componentname">Component Name</label>
                <input type="text" className="form-control"
                  value={this.state.formData.componentName}
                  onChange={(e) => this.handleChange(e, 'formData', 'componentName')} />
              </div>
              <div className="form-group">
                <label htmlFor="issue">Issue</label>
                <input type="text" className="form-control"
                  value={this.state.formData.issue}
                  onChange={(e) => { this.handleChange(e, 'formData', 'issue') }} />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                Done<input style={{ margin: "10px" }}
                  type="radio"
                  name="done"
                  value="done"
                  checked={this.state.formData.status === "done"}
                  onChange={(e) => { this.handleChange(e, 'formData', 'status') }}
                />  <br />
                Not Done<input style={{ margin: "10px" }}
                  type="radio"
                  name="done"
                  value="Not done"
                  checked={this.state.formData.status === "Not done"}
                  onChange={(e) => { this.handleChange(e, 'formData', 'status') }}
                />
              </div>
              <button type="submit" className="btn btn-md sg-submit-button" style={{ margin: "10px" }}>Assign</button>
            </div>
          </div>
        </form>
        <Alert color="primary" isOpen={this.state.collapse}>
          Your DATA has been updated!
        </Alert>
      </>
    )
  }
}
export default ManageRequestedComponent