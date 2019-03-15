import React, { Component } from 'react'
import { Route } from "react-router-dom";
import AuthService from './AuthService';
import PropTypes from 'prop-types';
import ListComponent from './listcomponent';
import AddComponent from './AddComponent'

let formData = {
  categoryId: '',
  componentName: '',
  serialNo: '',
  warrantyDate: '',
  status: '',
}
class a1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      formData: { ...formData },
      flag: false,
      id: ''
    }
    this.Auth = new AuthService();
    this.updateData = this.updateData.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateformData = this.updateformData.bind(this);
    this.editData = this.editData.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  updateData(data) {
    this.setState({ data })
  }

  updateformData() {
    this.setState({ formData: { ...formData } })
  }

  updateState() {
    this.setState({ flag: false, formData: { ...formData }, id: '' })
  }
  editData(element) {
    console.log(element)
    const formData1 = {
      categoryId: element.categoryId,
      componentName: element.componentName,
      serialNo: element.serialNo,
      warrantyDate: element.warrantyDate,
      status: element.status,
    }
    this.setState({ formData: formData1, flag: true, id: element.id })

  }

  handleChange(e, target, field) {
    e.preventDefault();
    const temp = { ...this.state[target] };
    temp[field] = e.target.value;
    this.setState({ [target]: temp })
  }
  render() {
    const { match } = this.props
    return (
      <>
        <Route path={`${match.url}/listcomponent`} render={(props) =>
          <ListComponent
            {...props}
            {...this.state}
            updateData={this.updateData}
            editData={this.editData}
          />
        }
        />

        <Route path={`${match.url}/addcomponent`} render={(props) =>
          <AddComponent
            {...props}
            {...this.state}
            updateState={this.updateState}
            updateformData={this.updateformData}
            handleChange={this.handleChange}
          />
        }
        />
      </>
    );
  }
}

a1.defaultProps = {
  match: {},
};
a1.propTypes = {
  match: PropTypes.object,
};
export default a1;
