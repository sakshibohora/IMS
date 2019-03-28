import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Alert } from 'reactstrap';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

class RequestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cId: [],
      cName: [],
      componentId: '',
      categoryId: '',
      categoryType: 'Select Category',
      dropdownOpen1: false,
      componentName: 'Select Component',
      dropdownOpen2: false,
      issue: '',
      collapse: false
    }
    this.Auth = new AuthService();
    this.changeValue1 = this.changeValue1.bind(this)
    this.changeValue2 = this.changeValue2.bind(this)
    this.changeValue3 = this.changeValue3.bind(this)

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
  }

  toggle(e) {
    this.setState(prevState => ({
      dropdownOpen1: !prevState.dropdownOpen1
    }));
  }

  toggle2(e) {
    this.setState(prevState => ({
      dropdownOpen2: !prevState.dropdownOpen2
    }));

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
  changeValue1(e) {
    this.setState({ categoryType: e.currentTarget.textContent });
    let id = e.currentTarget.getAttribute("id");
    this.setState({
      categoryId: id
    })
    const data = {
      categoryId: id
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

  changeValue2(e) {
    this.setState({ componentName: e.currentTarget.textContent });
    let id = e.currentTarget.getAttribute("id")
    this.setState({ componentId: id })
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

  changeValue3(e) {
    this.setState({ issue: e.target.value })
    this.setState({ collapse: false });
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-4">
            <form onSubmit={(e) => { this.handleFormSubmit(e) }}>
              <label htmlFor="selectcat">Select Category</label>
              <ButtonDropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle}>
                <DropdownToggle caret>{this.state.categoryType}</DropdownToggle>
                <DropdownMenu>
                  {this.state.cId.map(e => {
                    return (
                      <DropdownItem id={e.id} key={e.id} onClick={(e) => { this.changeValue1(e) }}>{e.categoryType}
                      </DropdownItem>)
                  })}
                </DropdownMenu>
              </ButtonDropdown>
              <br /><br />

              <label htmlFor="selectcomp">Select Component</label>
              <ButtonDropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                <DropdownToggle caret>{this.state.componentName}</DropdownToggle>
                <DropdownMenu>
                  {this.state.cName.map(e => {
                    return (
                      <DropdownItem id={e.id} key={e.id} onClick={(e) => { this.changeValue2(e) }}>{e.componentName}
                      </DropdownItem>)
                  })}
                </DropdownMenu>
              </ButtonDropdown>
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
            <Alert color="primary" isOpen={this.state.collapse}>
              Your request has been sent to Admin!
           </Alert>
          </div>
        </div>
      </>

    )
  }
}
export default RequestComponent