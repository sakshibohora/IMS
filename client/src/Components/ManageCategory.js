import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
import Simplert from 'react-simplert'

let formData = {
  categoryType: '',
}
class ManageCategory extends Component {
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
    axios.get(`${process.env.REACT_APP_SERVER}/api/categories/find/` + rowId, {
      headers: {
        'Authorization': header
      },
    })
      .then(response => {
        this.setState({
          formData: response.data.data,
          flag: true
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
    const header = this.Auth.getToken();
    if (this.state.flag === true) {
      axios.put(`${process.env.REACT_APP_SERVER}/api/categories/edit/` + this.props.id, this.state.formData, {
        headers: {
          'Authorization': header
        },
      })
        .then((res) => {
          this.props.makeData()
          this.setState({ collapse: true })
        }).catch((err) => {
          console.log(err)
        })
    } else {
      axios.post(`${process.env.REACT_APP_SERVER}/api/categories`, this.state.formData, {
        headers: {
          'Authorization': header
        },
      })
        .then((res) => {
          if(this.state.collapse === false) this.setState({ collapse: !this.state.collapse });

          this.props.makeData()

        }).catch((err) => {
          console.log(err)
        })
    }
  }
  render() {
    return (
      <>
        <form onSubmit={(e) => { this.handleFormSubmit(e) }}>
          <div className="row">
            <div className="col-5" style={{ margin: "10px" }}>
              <div className="form-group">
                <label htmlFor="categoryType">Category Type</label>
                <input type="text" className="form-control" placeholder="Enter category Type"
                  value={this.state.formData.categoryType}
                  onChange={(e) => { this.handleChange(e, 'formData', 'categoryType') }} />
              </div>
              <button type="submit" className="btn btn-md sg-submit-button" style={{ margin: "10px" }}>Submit</button>
            </div>
          </div>
        </form>
        <Simplert
          showSimplert={this.state.collapse}
          type={"success"}
          title={"alert"}
          message={'Category added Successfully'}
        />
      </>
    )
  }
}
export default ManageCategory