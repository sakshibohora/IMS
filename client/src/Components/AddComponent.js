import React, { Component } from 'react'
import withAuth from './withAuth';
import axios from 'axios'
import AuthService from './AuthService';
class AddComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.Auth = new AuthService()
    this.insertData = this.insertData.bind(this)
  }

  insertData(e) {
    e.preventDefault();
    if (this.props.flag === true) {
      axios.put('http://localhost:8080/api/components/edit' + this.props.id, this.props.formData)
        .then((res) => {
          console.log(res)
          this.props.updateState()
          this.props.history.push('/admin/a1/listcomponents');
        }).catch((err) => {
          console.log(err)
        })
    } else {
      axios.post('http://localhost:8080/api/components', this.props.formData)
        .then((res) => {
          console.log(res)
          this.props.updateformData()
          this.props.history.push('/admin/a1/listcomponent');
        }).catch((err) => {
          console.log(err)
        })
    }
  }
  render() {
    return (
      <>
        <form onSubmit={(e) => { this.insertData(e) }}>
          <div className="row">
            <div className="col-5" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="cateoryId">Category Id</label>
                <input type="text" className="form-control" placeholder="Enter category"
                  value={this.props.formData.categoryid}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'categoryid') }} />
              </div>
              <div className="form-group">
                <label htmlFor="componentname">Component Name</label>
                <input type="text" className="form-control" placeholder="Enter component name"
                  value={this.props.formData.componentname}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'componentname') }} />
              </div>
              <div className="form-group">
                <label htmlFor="serialno">Serial No</label>
                <input type="text" className="form-control" placeholder="serial no."
                  value={this.props.formData.serialno}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'serialno') }} />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input type="text" className="form-control" placeholder="status"
                  value={this.props.formData.status}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'status') }} />
              </div>
              <div className="form-group">
                <label htmlFor="warrantydate">Warranty date</label>
                <input type="date" className="form-control" placeholder="warranty date"
                  // value={this.props.formData.warrantydate}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'warrantydate') }} />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ margin: "10px" }}>Submit</button>
        </form>
      </>
    )
  }
}
export default withAuth(AddComponent)