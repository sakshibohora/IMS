import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import Simplert from 'react-simplert'
import Select from 'react-select'
// import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

class RequestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cId: [],
      cName: [],
      componentId: '',
      categoryId: '',
      categoryType: 'Select Category',
      componentName: 'Select Component',
      issue: '',
      collapse: false
    }
    this.Auth = new AuthService();
    this.changeValue1 = this.changeValue1.bind(this)
    this.changeValue2 = this.changeValue2.bind(this)
    this.changeValue3 = this.changeValue3.bind(this)
  }
  componentDidMount() {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/api/categories/getCategoryId`, {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({ cId: response.data.data })
    })
      .catch(function (error) {
        console.log(error);
      })
  }

  changeValue1 = (selectedOption) => {
    this.setState({ selectedOption });
    this.setState({ categoryId: selectedOption.value })
    const data = {
      categoryId: selectedOption.value
    }
    const header = this.Auth.getToken()
    axios.post(`${process.env.REACT_APP_SERVER}/api/components/getComponentName`, data, {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      this.setState({ cName: response.data.data })
      this.setState({ collapse: false });
    }).catch(function (error) {
      console.log(error);
    })

  }

  changeValue2 = (componentName) => {
    this.setState({ componentName });
    this.setState({ componentId: componentName.value })
  }

  changeValue3(e) {
    this.setState({ issue: e.target.value })
    this.setState({ collapse: false });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const data = {
      userId: this.props.user.id,
      categoryId: parseInt(this.state.categoryId),
      componentId: parseInt(this.state.componentId),
      componentName: this.state.componentName,
      issue: this.state.issue,
    }
    console.log(data)
    const header = this.Auth.getToken();
    axios.post(`${process.env.REACT_APP_SERVER}/api/requestComponents`, data, {
      headers: {
        'Authorization': header
      },
    })
      .then((response) => {
        if (this.state.collapse === false) this.setState({ collapse: !this.state.collapse });
        this.setState({ categoryId: 'Select Category', componentName: 'Select Component' })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  render() {
    return (
      <>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-4">
            <form onSubmit={(e) => { this.handleFormSubmit(e) }}>
              <label htmlFor="selectcat">Select Category</label>
              <Select className="label1"
                options={this.state.cId.map(e => ({
                  label: e.categoryType,
                  value: e.id
                }))}
                value={this.selectedOption}
                onChange={(e) => { this.changeValue1(e) }}
              />
              <br /><br />

              <label htmlFor="selectcomp">Select Component</label>
              <Select className="label1"
                options={this.state.cName.map(e => ({
                  label: e.componentName,
                  value: e.id
                }))}
                value={this.selectedOption}
                onChange={(e) => { this.changeValue2(e) }}
              />
              <br /><br />
              <label htmlFor="issue">Issue</label>
              <textarea
                placeholder="Description goes here..."
                name="issue"
                onChange={(e) => { this.changeValue3(e) }} required
              />
              <br />
              <button type="submit" className="btn btn-md sg-submit-button">Request Send</button>
            </form>
            <Simplert
              showSimplert={this.state.collapse}
              type={"success"}
              title={"alert"}
              message={'Request sent Successfully'}
            />
          </div>
        </div>
      </>
    )
  }
}
export default RequestComponent