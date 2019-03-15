import React, { Component } from 'react'
import { Button } from 'reactstrap';
import axios from 'axios';
let formdata = {
  userId: '',
  categoryId: '',
  componentId: '',
  componentName: '',
  issue: '',
  status: '',
}
class AssignRequestedComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formdata: { ...formdata }
    }
    this.handleUpdateData = this.handleUpdateData.bind(this)
  }
  componentDidMount() {
    axios.get('http://localhost:8080/api/requestcomponents/find/' + this.props.match.params.id)
      .then(response => {
        // console.log("incident find", response.data)
        this.setState({ formdata: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  handleUpdateData(e) {
    e.preventDefault();
    const fpt = {
      userId: this.state.formdata.userId,
      categoryId: this.state.formdata.categoryId,
      componentId: this.state.formdata.componentId,
      componenttName: this.state.formdata.componentName,
      issue: this.state.formdata.issue,
      status: this.state.formdata.status,
    }
    console.log(fpt)
    axios.put('http://localhost:8080/api/requestComponents/edit/' + this.props.match.params.id, fpt)
      .then((response) => {
        console.log(response)
        this.props.history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  ChangeValue(e, currentUser, field2) {
    e.preventDefault();
    const temp = { ...this.state[currentUser] };
    temp[field2] = e.target.value;
    this.setState({ [currentUser]: temp });
  }
  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleUpdateData(e)}>
          <div className="row">
            <div className="col-4" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="componentname">Component Name</label>
                <input type="text" className="form-control"
                  value={this.state.formdata.componentName}
                  onChange={(e) => this.ChangeValue(e, 'formdata', 'componentName')} />
              </div>
              <div className="form-group">
                <label htmlFor="issue">Issue</label>
                <input type="text" className="form-control"
                  value={this.state.formdata.issue}
                  onChange={(e) => { this.ChangeValue(e, 'formdata', 'issue') }} />
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
export default AssignRequestedComponent