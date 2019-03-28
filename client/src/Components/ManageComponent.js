import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
import { Alert } from 'reactstrap'

let formData = {
  categoryId: '',
  componentName: '',
  serialNo: '',
  warrantyDate: null,
  status: '',
}
class ManageComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: { ...formData },
      flag: false, //false = insert, true = edit
      collapse: false,
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
    axios.get(`${process.env.REACT_APP_SERVER}/api/components/find/` + rowId,{
      headers: {
        'Authorization': header
      },
    })
      .then(response => {
        console.log(response)
        this.setState({
          formData: response.data.data,
          flag: true,
          collapse: false,
        });
        console.log(this.state.flag)
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
    const header = this.Auth.getToken();

    if (this.state.flag === true) {
      axios.put(`${process.env.REACT_APP_SERVER}/api/components/edit/` + this.props.id, this.state.formData, {
        headers: {
          'Authorization': header
        },
      })
        .then((res) => {
          console.log("update", res)
          this.props.makeData()
          this.setState({ collapse: true })
          // this.props.history.push('/admin/adminhome/a2/listcategory');
        }).catch((err) => {
          console.log(err)
        })
    } else {
      axios.post(`${process.env.REACT_APP_SERVER}/api/components`, this.state.formData, {
        headers: {
          'Authorization': header
        },
      })
        .then((res) => {
          // console.log(res)
          this.props.makeData()
          this.setState({ collapse: true })
        }).catch((err) => {
          console.log(err)
        })
    }
  }
  render() {
    return (
      <>
        <form onSubmit={(e) => { this.handleFormSubmit(e) }}>
          <div className="row" >
            <div className="col-5" style={{ margin: "10px" }} >
              <div className="form-group">
                <label htmlFor="cateoryId">Category Id</label>
                <input type="text" className="form-control" placeholder="Enter category"
                  value={this.state.formData.categoryId}
                  onChange={(e) => { this.handleChange(e, 'formData', 'categoryId') }} />
              </div>
              <div className="form-group">
                <label htmlFor="componentname">Component Name</label>
                <input type="text" className="form-control" placeholder="Enter component name"
                  value={this.state.formData.componentName}
                  onChange={(e) => { this.handleChange(e, 'formData', 'componentName') }} />
              </div>
              <div className="form-group ">
                <label htmlFor="serialno">Serial No</label>
                <input type="text" className="form-control" placeholder="serial no."
                  value={this.state.formData.serialNo}
                  onChange={(e) => { this.handleChange(e, 'formData', 'serialNo') }} />
              </div>
            </div>
            <div className="col-6" style={{ margin: "10px" }}>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input type="text" className="form-control" placeholder="status"
                  value={this.state.formData.status}
                  onChange={(e) => { this.handleChange(e, 'formData', 'status') }} />
              </div>
              <div className="form-group">
                <label htmlFor="warrantydate">Warranty date</label>
                <input type="date" className="form-control" placeholder="warranty date"
                  value={this.state.formData.warrantyDate}
                  onChange={(e) => { this.handleChange(e, 'formData', 'warrantyDate') }} />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ margin: "10px" }}>Submit</button>
            </div>
          </div>
        </form>
        <Alert color="primary" isOpen={this.state.collapse}>
          Your DATA has been recorded!
        </Alert>
      </>
    )
  }
}
export default ManageComponent